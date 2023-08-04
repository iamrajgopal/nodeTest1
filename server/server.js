const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const Port = process.env.Port || 5000
const connection = require('./dataBase/db')

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const route = require('./routes/agroEmployeeRoute');

//route for posting employees details
app.use('/employee',route);
app.use('/validEmployee',route)
app.use('/token',route);
app.use('/Profile',route)

app.listen(Port, () => {
    console.log(`Listening To Port :${Port}`)
})


