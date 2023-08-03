const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const employees = require("../model/agroEmployeeModel");
const jwt_secret = "JSONtoken";

const editingEmployeeProfile = async (req, res) => {
  let details = req.body;
  //destructuring data from client
  let tokenFromClient = details.token;
  let passWord = details.password;

  //hashing new pasword from client
  let theHashedpassword = await bcrypt.hash(passWord, saltRounds);

  //decoding token from client and sending email
  const decodedToken = await jwt.verify(tokenFromClient, jwt_secret);
  console.log(decodedToken.email);

  try {
    let editEmployee = await employees.findOne({ email: decodedToken.email });

    if (editEmployee) {
      const query = { email: decodedToken.email };
      let response = await employees.findOneAndUpdate( query,{ $set: { password: theHashedpassword } },{new: true});
      
      if (response) {
        res.status(200).json({
          status: "success",
          message: "Password updated successfully",
        });
      } else {
        res.status(200).json({
          status: "error",
          message: "Failed to update password",
        });
      }
    } else {
      res.status(404).json({
        status: "not-found",
        message: "Employee not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};


const editingEmployeeMobileNumber = async (req, res) => {
    let details = req.body;
    //destructuring data from client
    let tokenFromClient = details.token;
    let Mobile = details.mobile;

    //decoding token from client and sending email
    const decodedToken = await jwt.verify(tokenFromClient, jwt_secret);
    console.log(decodedToken.email);
  
    try {
      let editEmployee = await employees.findOne({ email: decodedToken.email });
  
      if (editEmployee) {
        const query = { email: decodedToken.email };
        let response = await employees.findOneAndUpdate( query,{ $set: { mobile: Mobile } },{new: true});
        
        if (response) {
          res.status(200).json({
            status: "success",
            message: "mobileNumber updated successfully",
          });
        } else {
          res.status(200).json({
            status: "error",
            message: "Failed to update password",
          });
        }
      } else {
        res.status(404).json({
          status: "not-found",
          message: "Employee not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };

    //deleting Empolyee account
  const deletingEmployeeAccount = async (req, res) => {
    let details = req.body;
    //destructuring data from client
    let tokenFromClient = details.token;

    //decoding token from client and sending email
    const decodedToken = await jwt.verify(tokenFromClient, jwt_secret);
    console.log(decodedToken.email);
  
    try {
      let Employee = await employees.findOne({ email: decodedToken.email });
  
      if (Employee) {
        const query = { email: decodedToken.email };
        let response = await employees.deleteOne(query);
        
        if (response) {
          res.status(200).json({
            status: "success",
            message: "Account Deleted Successfully",
          });
        } else {
          res.status(200).json({
            status: "error",
            message: "Failed to Delete Your Account",
          });
        }
      } else {
        res.status(404).json({
          status: "not-found",
          message: "Employee not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };



module.exports = {editingEmployeeProfile,editingEmployeeMobileNumber,deletingEmployeeAccount};
