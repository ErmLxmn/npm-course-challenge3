const mySecret = process.env['MONGO_URI']
require('dotenv').config();
const mongoose = require('mongoose');

function START_CONNECTION(){
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(function() { console.log("DB Connected")})
        .catch(error => {console.log(error.message)});
}

exports.START_CONNECTION = START_CONNECTION;