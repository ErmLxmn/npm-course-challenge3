require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mySecret = process.env['MONGO_URI']
require('dotenv').config();
const mongoose = require('mongoose');
const connection = require('./mongodb.js');
const bodyParser = require('body-parser');

connection.START_CONNECTION();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

let urlSchema = new mongoose.Schema({
  url: {type: String , require: true},
  short_url : Number,
})

let URL = mongoose.model('url', urlSchema)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", function (req, res){
  let dataUrl = req.body.url;
  let response = {};

  let short_url = 1;
  URL.findOne({url : dataUrl}, function (err, urlFound) {
    if(err) return console.log(err);

    if(!urlFound){
      let newURL = new URL({
        url : dataUrl,
        short_url
      })
      newURL.save(function (err, saveUrlFound){
        if (err) return console.error(err);

        response = {original_url : saveUrlFound.url , short_url : saveUrlFound.short_url}
        return res.json(response);
      })
    }
    else{
      URL.findOneAndUpdate({url : dataUrl}, {short_url : urlFound.short_url + 1}, {new: true}, (err, urlUpdateFound) => {
        if(err) return console.log(err);

        response = {original_url : urlUpdateFound.url , short_url : urlUpdateFound.short_url}
        return res.json(response);
    })
    }
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
