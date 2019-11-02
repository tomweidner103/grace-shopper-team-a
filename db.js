const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, INTEGER, ENUM } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/playback');
const crypto =  require('crypto')

const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  },
  email: {
    type: STRING,
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false
  }, ///salt needed for encryption
  salt: {
    type: Sequelize.STRING
  }
});

const Guest = conn.define('guest', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  email: {
    type: STRING
  }
});

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: STRING
  },
  price: {
    type: INTEGER
  },
  quantity: {
    type: INTEGER
  },
  imageURL: {
    type: STRING,
    defaultValue: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjWgtmipMXlAhWL3OAKHWYFDUAQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fwww.teepublic.com%252Fsticker%252F2256665-vinyl-vintage-record%26psig%3DAOvVaw2RpA1PAzqb261Vz4lDRHaE%26ust%3D1572569538877598&psig=AOvVaw2RpA1PAzqb261Vz4lDRHaE&ust=1572569538877598'
  },
  genre: {
    type: ENUM('Rap', 'Rock', 'R&B', 'Alternative', 'Metal')
  }
});

// const ProductDetail = conn.define('productDetail', {
//   id: {
//     type: UUID,
//     primaryKey: true,
//     defaultValue: UUIDV4,
//   },
//   name: {
//     type: STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
//   price: {
//     type: INTEGER
//   },
//   quantity: {
//     type: INTEGER
//   },
//   imageURL: {
//     type: STRING(1234),
//     defaultValue: 'randomalbumcover'
//   },
//   genre: {
//     type: ENUM('Rap', 'Rock', 'R&B', 'Alternative', 'Metal')
//   }
// });

const Payment = conn.define('payment', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // price: {
  //   type: INTEGER
  // }
});

const Order = conn.define('order', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  price: { //total cost/sale
    type: INTEGER
  },
  quantity: {
    type: INTEGER
  }
});

const OrderDetail = conn.define('orderDetail', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  price: {
    type: INTEGER
  },
  quantity: {
    type: INTEGER
  }
});

const Cart = conn.define('cart', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  quantity: {
    type: INTEGER,
    validate: {
      min : 1
    }
  },
});

Cart.belongsTo(User)
User.hasMany(Order);
Order.hasMany(Product);
Payment.belongsTo(Order);
OrderDetail.belongsTo(Order);
// ProductDetail.belongsTo(Product);
OrderDetail.hasMany(Product);
Cart.hasMany(Product);
Product.belongsTo(Cart);

const sync = async () => {
  await conn.sync({ force: true });
  let users = [
    {name: 'Shruti', email: 'shruti@email.com', password: 'SHRUTI'},
    {name: 'Akshay', email: 'akshay@email.com', password: 'AKSHAY'},
    {name: 'Oscar', email: 'oscar@email.com', password: 'OSCAR'},
    {name: 'Alexandra', email: 'alexandra@email.com', password: 'ALEXANDRA'},
  ]
  const [ Shruti, Akshay, Oscar, Alexandra ] = await Promise.all(users.map( user => User.create(user)));

  let products = [
    {name: 'Scorpion', description: 'Long album', price: 10, quantity: 1, imageURL: '', genre: 'Rap'},
    {name: 'GKMC', description: 'Beautiful', price: 12, quantity: 1, imageURL: '', genre: 'Rap'},
    {name: 'BC', description: 'Best', price: 7, quantity: 1, imageURL: '', genre: 'R&B'}
  ]
  const [ Scorpion, GKMC, BC ] = await Promise.all(products.map( product => Product.create(product)));

  let items =[
    {quantity : 1, productId : Scorpion.id, userId : Akshay.id},
    {quantity : 3, productId : BC.id, userId : Alexandra.id}
  ]
  await Promise.all(items.map( item => Cart.create(item)));

  // let payments = [
  //   {name: 'Visa'},
  //   {name: 'Discover'},
  //   {name: 'MasterCard'}
  // ]
  // const [ Visa, Discover, MasterCard ] = await Promise.all(payments.map( payment => Payment.create(payment)));

  // let orders = [
  //   {price: 15, quantity: }
  // ]
}

///generates random string
User.getRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};

///part of SHA-2 cryto function to hash pw
User.sha256 = function(password, salt){
  let hash = crypto.createHmac('sha256', salt);
  hash.update(password);
  let value = hash.digest('hex');
  return {
    salt,
    passwordHash: value
  }
};
//uses two above methods to finally set salt/hash on pw, on login and for any change
function saltHashPassword (user) {
  if(user.changed('password')){
  user.salt = User.getRandomString(12);
  user.password = User.sha256(user.password, user.salt);
  }
};

///function to check for correct pw in routes
User.prototype.correctPassword = function(pwd) {
  return User.sha256(pwd, this.salt()) === this.password()
}

//hooks using above methods to salt/hash pw for encryption
User.beforeCreate(saltHashPassword);
User.beforeUpdate(saltHashPassword);


module.exports = {
  conn,
  sync,
  models: {
    User,
    Guest,
    Product,
    // ProductDetail,
    Payment,
    Order,
    OrderDetail,
    Cart
  }
}
