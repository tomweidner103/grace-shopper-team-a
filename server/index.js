const express = require('express');
const path = require('path');
const app = express();
const db = require('../db');
const { models: { User, Guest, Product, Payment, Order, OrderDetail } } = require('../db');
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
})

db.sync()
  .then(() => {
app.listen(port, ()=> console.log(`listening on port ${port}`));
})