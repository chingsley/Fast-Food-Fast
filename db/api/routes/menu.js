const express = require('express');
const router = express.Router();
const messanger = require('./messangerFunctions/menuMessanger');


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
  const queryText = 'SELECT * FROM menu';
  pool.query(queryText)
  .then((result) => {
    res.status(200).json({
      "status": 200,
      "message": "successful",
      "result": result.rows
    }); // Will GET an array of objects
    // pool.end();
  })
  .catch( (err) => {
    console.log(err);
    // pool.end();
  });

});





module.exports = router;
