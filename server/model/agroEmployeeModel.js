
const mongoose = require('mongoose');
const dotnev = require('dotenv').config();

let collection = process.env.collect;

const agroEmployeesSchema =  mongoose.Schema({
    name: String,
    gender: String,
    age: Number,
    mobile: Number,
    email: String,
    password: String
});

const employees = new mongoose.model(collection, agroEmployeesSchema);

module.exports = employees;
