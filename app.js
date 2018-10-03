/*  ====================================================== */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


const orderRoutes = require('./api/routes/orders');

app.use(bodyParser.json());

//  enables the rendering of html for the home page of the endpoints
app.use(express.static(__dirname));

//  render the homepage at localhost:3000/
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/orders', orderRoutes);
app.use('/api/v1/orders', orderRoutes);

module.exports = app;
