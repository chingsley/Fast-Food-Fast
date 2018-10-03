const express = require('express');
const router = express.Router();
const messanger = require('./messangerFunctions/userMessanger');

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
  pool.query('SELECT * FROM users', (err, result) => {

    res.status(200).json({
      "status": 200,
      "message": "successful",
      "result": messanger.getUsers()
    });
    // pool.end();
  });
});



// Handle POST request to register a new user
router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const telephone = req.body.telephone;

  pool.query(
    `INSERT INTO users (username, password, email, telephone) VALUES ('${username}', '${password}', '${email}', '${telephone}')`, (err, result) => {
    res.status(201).json({
      "status": 201,
      "message": "Successful"
    });
    // pool.end();
  });
});

// Handle POST request to login a user
router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let isUser = messanger.validateUser(username, password);
  if(isUser) {
    res.status(200).json({
      "status": 200,
      "message": "access granted"
    });
  }else {
    res.status(401).json({
      "status": 401,
      "message": "Unathorized Access. Acess denied."
    });
  }
});


module.exports = router;
