const { Pool, Client } = require('pg')

// for connection information
const pool = new Pool({
  user: 'eneja',
  host: 'localhost',
  database: 'fastfoodfastdb',
  password: 'chinonxo',
  port: 5432,
});

let orders;
// testing conncetion to the database with a sample orders table
const queryText = 'SELECT * FROM orders';
pool.query(queryText)
  .then( (res) => {
    orders = res.rows;
    console.log(orders);
    pool.end();
  })
  .catch( (err) => {
    console.log(err);
    // pool.end();
  });

