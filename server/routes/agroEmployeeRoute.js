const express = require('express');
const route = express.Router();
const {postingEmployeeDetails,ValidationEmployee,validatingToken} = require('../controller/employeeController') ;
const {editingEmployeeProfile,editingEmployeeMobileNumber,deletingEmployeeAccount} = require('../controller/editController');
const authMiddleware = require('../middleWare1/authMiddleware');
const directingToDashboard = require('../controller/directingToDashboard')

route.post('/postingEmployeeDetails',postingEmployeeDetails);
route.post('/validEmployees',ValidationEmployee);
route.post('/tokenValidation',validatingToken);
route.post('/editProfile',editingEmployeeProfile);
route.post('/editmobile',editingEmployeeMobileNumber)
route.post('/deleteAccount',authMiddleware,deletingEmployeeAccount);
route.post('/directingToDash',authMiddleware,directingToDashboard);

module.exports = route



