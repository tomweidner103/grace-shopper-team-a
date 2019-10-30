const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, INTEGER, ENUM } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/playback');

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
    type: STRING
  },
  password: {
    type: STRING,
    allowNull: false
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
    type: STRING(1234),
    defaultValue: 'randomalbumcover.jpg'
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
    type: INTEGER
  },
});

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
  // let users = [
  //   {name: 'Shruti', email: 'shruti@email.com', password: 'SHRUTI'},
  //   {name: 'Akshay', email: 'akshay@email.com', password: 'AKSHAY'},
  //   {name: 'Oscar', email: 'oscar@email.com', password: 'OSCAR'},
  //   {name: 'Alexandra', email: 'alexandra@email.com', password: 'ALEXANDRA'},
  // ]
  // const [ Shruti, Akshay, Oscar, Alexandra ] = await Promise.all(users.map( user => User.create(user)));

  let products = [
    {name: 'Scorpion', description: 'Long album', price: 10, quantity: 1, imageURL: 'scorpio.jpg', genre: 'Rap'},
    {name: 'GKMC', description: 'Beautiful', price: 12, quantity: 1, imageURL: 'gkmc.jpg', genre: 'Rap'},
    {name: 'BC', description: 'Best', price: 7, quantity: 1, imageURL: 'bc.jpg', genre: 'R&B'}
  ]
  const [ Scorpion, GKMC, BC ] = await Promise.all(products.map( product => Product.create(product)));

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

module.exports = {
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
