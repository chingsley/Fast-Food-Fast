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
  })
  .catch( function (err){
    console.log(err);
    // pool.end();
  });

});


// Handle POST request to add an order
router.post('/', (req, res, next) => {
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
  })
  .catch( function (err){
    res.status(500).json({
      message: 'Failed to place a new order'
    });
    console.log(err);
  });

});

//  Get all the order history belonging to a  specific user
router.get('/:userId/orders', (req, res, next) => {
  const id = req.params.userId;
  const queryText = `SELECT * FROM orders WHERE userId = '${id}'`;
  pool.query(queryText)
  .then( function (result) {
      res.status(200).json({
        "status": 200,
        "message": "successful",
        "result": result.rows
      });
  })
  .catch( function (err){
    res.status(404).json({
      "status": 404,
      message: 'Not Found'
    });
    console.log(err);
    // pool.end();
  });
});

//  Handle GET request for a particular orders specified by ID
router.get('/:orderID', (req, res, next) => {
  const id = req.params.orderID;
  const order = messanger.getOrder(id);
  if (order) {
    res.status(200).json({
      "status": 200,
      "message": "successful",
      "result": order
    });
  } else {
    res.status(404).json({
      error: 'The specified id does not match any order in our system',
    });
  }
});

//Handle PUT request updating an order, like setting the status of an order: "pending", "complete", or "declined"
router.put('/:orderID', (req, res, next) => {
  // console.log(req.body.status);
    const id = req.params.orderID;
    let obj = {
      status: req.body.status
    }
    let updatedOrder = messanger.updateOrder(id, obj);
    if(updatedOrder){
      res.status(200).json({
        status: 200,
        message: 'order update: Successful!',
        // order: updatedOrder,
      });
    }else {
      res.status(404).json({
        error: "not found"
      });
    }
});


module.exports = router;
