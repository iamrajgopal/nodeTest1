const express = require('express');
const route = express.Router();
const {postingEmployeeDetails,ValidationEmployee,validatingToken} = require('../controller/employeeController') ;
const {editingEmployeeProfile,editingEmployeeMobileNumber,deletingEmployeeAccount} = require('../controller/editController');

route.post('/postingEmployeeDetails',postingEmployeeDetails);
route.post('/validEmployees',ValidationEmployee);
route.post('/tokenValidation',validatingToken);
route.post('/editProfile',editingEmployeeProfile);
route.post('/editmobile',editingEmployeeMobileNumber)
route.post('/deleteAccount',deletingEmployeeAccount)

module.exports = route

