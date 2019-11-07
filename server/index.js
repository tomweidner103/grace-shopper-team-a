const express = require('express');
const path = require('path');
const app = express();
const db = require('../db');
const { conn, models: { User, Guest, Product, Payment, Order, OrderDetail, Cart, Lineitem } } = require('../db');
const port = process.env.PORT || 3005;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const router = require('express').Router();
const volleyball = require('volleyball');

app.use(volleyball);

app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users)
  }
  catch(ex) {
    next(ex)
  }
}); 

app.post('/api/users', async (req, res, next) => {
  try {
    const user = User.create(req.body)
    res.status(201).send(user)
  }
  catch(ex) {
    next(ex)
  }
})

app.put('/api/users', async ( req, res, next ) => {
  try {
    const instance = await User.findByPk(req.body.id);
    Object.assign(instance, req.body);
    instance.save();
    res.send(instance);
  }
  catch(ex) {
    next(ex)
  }
});

app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user)
  }
  catch(ex) {
    next(ex)
  }
});

app.get('/api/products', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products)
  }
  catch(ex) {
    next(ex)
  }
});

app.get('/api/products/:id', async (req, res, next) => {
  try {
    const products = await Product.findByPk(req.params.id);
    res.send(products)
  }
  catch(ex) {
    next(ex)
  }
});

app.get('/api/cart', async ( req, res, next ) => {
  try {
    const cart = await Lineitem.findAll( { include: [ Product ] });
    res.send(cart);
  }
  catch(ex) {
    next(ex)
  }
});

app.post('/api/cart', async (req, res, next) => {
  try {
    const item = await Cart.create(req.body)
    res.status(201).send(item)
  }
  catch(ex) {
    next(ex)
  }
});

// app.post('/api/cart', async ( req, res, next ) => {
//   try {
//     const product = await Product.findAll({ where: { id: req.body.cartId }})
//     req.body.cartId = product[0].id
//     const cart = await Cart.create(req.body, { include: [ Product ] });
//     res.send(cart);
//   }
//   catch(ex) {
//     next(ex);
//   }
// });

app.put('/api/cart', async ( req, res, next ) => {
  try {
    const instance = await Lineitem.findByPk(req.body.id, {include: [Product]});
    if (req.body.method === 'add') {
      instance.quantity = ++instance.quantity;
    }
    if (req.body.method === 'subtract' && instance.quantity > 1) {
      instance.quantity = --instance.quantity;
    }
    instance.save();

    res.send(instance);
  }
  catch(ex) {
    next(ex)
  }
});

//cartID to send in for validation

app.delete('/api/cart/:id', async ( req, res, next ) => {
  try {
    await Cart.destroy({ where: {id: req.params.id} });
    res.sendStatus(201);
  }
  catch(ex) {
    next(ex);
  }
});

db.sync()
  .then(() => {
app.listen(port, ()=> console.log(`listening on port ${port}`));
})


//these lines serialize the user
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})


///using connect-sess-seq to create model for db to log sessions into the store fluidly
const ourStore =  new SequelizeStore({ db: conn });

//middleware for the store
app.use(session({
  secret: 'playback4321',
  store: ourStore,
  resave: false,
  proxy: true
}));

///sync sessions to store
ourStore.sync();

//passport middleware to create sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: true}))

////post route, first finds user with email => if not valid email, err, => if email exits but password doesnt match, err => both match, session logs in
app.post('/api/login', (req, res, next) => {
  User.findOne({where:{email: req.body.email}})
    .then(user => {
      if (!user){
        res.status(401).send('Wrong email and/or password');
      } else if (!user.correctPassword(req.body.password, user)){
        req.status(401).send('Wrong email and/or password');
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
        //res.redirect('/api/products');
      }
    })
    .catch(next)
  });

////for sign up once we have it, create user with body info, once created, logs in. if not created because email exists in db, error occurs
app.post('/api/register', (req, res, next)=>{
  User.create(req.body)
    .then(user => {
      req.session.user = user
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if(err.name === 'SequelizeUniqueConstraintError'){
        res.status(401).send('User already xists');
      } else {
        next(err)
      }
    })
})

////logout button link, deletes session and sends back to home
app.delete('/api/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect('/api/');
});

app.get('/api/me', (req, res, next)=>{
  res.json(req.user);
});
