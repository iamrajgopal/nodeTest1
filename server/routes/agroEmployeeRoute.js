const express = require('express');
const route = express.Router();
const  {postingEmployeeDetails,ValidationEmployee,validatingToken} = require('../controller/employeeController') ;


route.post('/postingEmployeeDetails',postingEmployeeDetails);
route.post('/validEmployees',ValidationEmployee);
route.post('/tokenValidation',validatingToken);

module.exports = route

