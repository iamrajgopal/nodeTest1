const mongoose = require('mongoose');
const dotnev = require('dotenv').config()

let url = process.env.MongodbConnectionString

let connection = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('database Connected')).catch((error) => console.log('error occured in database :', error))

module.exports = connection;