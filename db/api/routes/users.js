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



module.exports = router;
