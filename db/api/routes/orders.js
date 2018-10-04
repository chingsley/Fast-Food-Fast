const express = require('express');
const router = express.Router();

const messanger = require('./messangerFunctions/orderMessanger');
const orders = messanger.getOrders();

const { Pool, Client } = require('pg')

// for connection information
  const pool = new Pool({
    user: 'eneja',
    host: 'localhost',
    database: 'fastfoodfastdb',
    password: 'chinonxo',
    port: 5432,
  });


//  Handle GET request for orders
router.get('/', (req, res, next) => {
  const queryText = 'SELECT * FROM orders';
  pool.query(queryText)
  .then( function (result) {
    res.status(200).json({
      "status": 200,
      "message": "successful",
      "result": result.rows
    }); // Will GET an array of objects
    // pool.end();
  })
  .catch( function (err){
    console.log(err);
    // pool.end();
  });

});


// Handle POST request to add an order
router.post('/', (req, res, next) => {
  // let id = messanger.getNewID()
  const order = {
     userId : req.body.userId,
     foodItem : req.body.foodItem,
     quantity : req.body.quantity,
     price : req.body.price,
     date : req.body.date
  };

  const queryText = `INSERT INTO orders (userId, foodItem, quantity, price, date, status) VALUES ( '${order.userId}', '${order.foodItem}', '${order.quantity}', '${order.price}', '${order.date}', 'pending')`;
  pool.query(queryText)
  .then( function (result) {
    res.status(201).json({
      "status": 201,
      "message": "successful",
      "result": order
    }); // Will GET an array of objects
    // pool.end();
  })
  .catch( function (err){
    res.status(500).json({
      message: 'Failed to place a new order'
    });
    console.log(err);
    // pool.end();
  });

});


module.exports = router;
