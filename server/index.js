const express = require('express');
const path = require('path');
const app = express();
const db = require('../db');
const { models: { User, Guest, Product, Payment, Order, OrderDetail, Cart } } = require('../db');
const port = process.env.PORT || 3005;

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
    const cart = await Cart.findAll();
    res.send(cart);
  }
  catch(ex) {
    next(ex)
  }
});

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
