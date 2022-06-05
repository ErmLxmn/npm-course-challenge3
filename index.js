require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mySecret = process.env['MONGO_URI']
require('dotenv').config();
const mongoose = require('mongoose');
const connection = require('./mongodb.js');

connection.START_CONNECTION();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", function (req, res){

  res.json({});
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
