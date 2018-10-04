const { Pool, Client } = require('pg')

// for connection information
const pool = new Pool({
  user: 'eneja',
  host: 'localhost',
  database: 'fastfoodfastdb',
  password: 'chinonxo',
  port: 5432,
});

//  testing the connection
let users;
pool.query('SELECT * FROM users', (err, result) => {
  if(err) throw err;
  users =  result.rows;
  // pool.end();
});
console.log(users);