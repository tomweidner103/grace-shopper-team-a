const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, INTEGER, ENUM, BOOLEAN } = Sequelize;
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
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: STRING,
    allowNull: false
  },
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
    defaultValue: 'https://i.pinimg.com/736x/6d/82/a5/6d82a57b6268a57a4b46d6ece3ea7f3d--vintage-music-vintage-stuff.jpg'
  },
  genre: {
    type: ENUM('Rap', 'Rock', 'R&B', 'Alternative', 'Metal')
  }
});

const Lineitem = conn.define('lineitem', {
  name: STRING,
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

const Cart = conn.define('cart', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  purchased: {
    type: BOOLEAN,
    defaultValue: false
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

User.hasMany(Order);
Order.hasMany(Product);
Payment.belongsTo(Order);
OrderDetail.belongsTo(Order);
// ProductDetail.belongsTo(Product);

OrderDetail.hasMany(Product);

Cart.belongsTo(User);
Cart.hasMany(Lineitem);
Lineitem.belongsTo(Cart);
Product.hasMany(Lineitem);
Lineitem.belongsTo(Product);
 
const sync = async () => {
  await conn.sync({ force: false });
  // let users = [
  //   {name: 'Shruti', email: 'shruti@email.com', password: 'SHRUTI'},
  //   {name: 'Akshay', email: 'akshay@email.com', password: 'AKSHAY'},
  //   {name: 'Oscar', email: 'oscar@email.com', password: 'OSCAR'},
  //   {name: 'Alexandra', email: 'alexandra@email.com', password: 'ALEXANDRA'},
  // ]
  // const [ Shruti, Akshay, Oscar, Alexandra ] = await Promise.all(users.map( user => User.create(user)));

  // let products = [
  //   {name: 'Scorpion', description: 'Long album', price: 10, quantity: 1, genre: 'Rap'},
  //   {name: 'GKMC', description: 'Beautiful', price: 12, quantity: 1, genre: 'Rap'},
  //   {name: 'BC', description: 'Best', price: 7, quantity: 1, genre: 'R&B'}
  // ]
  // const [ Scorpion, GKMC, BC ] = await Promise.all(products.map( product => Product.create(product)));

  // let items =[
  //   {quantity : 1, productId : Scorpion.id, userId : Akshay.id},
  //   {quantity : 3, productId : BC.id, userId : Alexandra.id}
  // ]
  // await Promise.all(items.map( item => Lineitem.create(item)));

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
const getRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};

///part of SHA-2 cryto function to hash pw
const sha256 = function(password, salt){
  let hash = crypto.createHmac('sha256', salt);
  hash.update(password);
  let value = hash.digest('hex');
  return value;
};
//uses two above methods to finally set salt/hash on pw, on login and for any change
function saltHashPassword (user) {
  if(user.changed('password')){
  user.salt = getRandomString(12);
  user.password = sha256(user.password, user.salt);
  }
};

///function to check for correct pw in routes
User.prototype.correctPassword = function(pwd) {
  return sha256(pwd, this.salt)
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
    Lineitem,
    Cart,
  }
}
