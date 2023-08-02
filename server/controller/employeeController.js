const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const employees = require("../model/agroEmployeeModel");


let postingEmployeeDetails = async (req, res) => {
    let theuserCredentials = req.body;
    try {
        const existingEmployee = await employees.findOne({ email: theuserCredentials.email });

        if (existingEmployee) {
          res.status(200).send({
            status: "failed",
            message: "User with this email already exists",
            data: existingEmployee,
          })
        } else {
            //used bcrypt for password proection hashing
            let hashedPassword = await bcrypt.hash(theuserCredentials.password,saltRounds)
            const savedEmployee = await employees.insertMany({email: theuserCredentials.email,password:hashedPassword,name:theuserCredentials.name,mobile:theuserCredentials.mobile});
            res.status(200).send({
                    status: "success",
                    message: "user registered sucessfully",
                    data: savedEmployee,
                });
        }
    } catch (error) {
        res.status(500).json({ message: "unable save user into database" });
    }
};


//validating And givingauthentication to user

//jwt secretkeys

const jwt_secret = 'JSONtoken'

let ValidationEmployee = async (req,res)=>{
   let loginDetails = req.body;
   let Email = loginDetails.email;
   let Pass = loginDetails.password
   try {
    let userExist = await employees.findOne({email:Email});

    //sending token to front-end if password is correct
    const token = await jwt.sign({email:userExist?userExist.email:''},jwt_secret,
    // {expiresIn: 60}
    );

    if(userExist){
        //bcrypt is compared with the userGiven to  the database password
        const isPasswordMatched = await bcrypt.compare(Pass, userExist.password);

        if(isPasswordMatched===true){
            res.status(200).send({
                status: "sucess",
                message: "Logged In Sucessfully",
                data: userExist,
                token:token
              }) 
        }else{
            res.status(200).json({status:'wrong',message:'Entered a wrong Password'})
        }
       
    }else if(!userExist){
        res.status(200).json({status:'failed',message:'No user with this email id'})
    }
    
   } catch (error) {
        res.status(500).json({status:'error',message:'error occured'})
   }
}

let validatingToken = async (req,res)=>{
 const tokenFromClient = req.body.token;
 //getting already existing token from the user and decrypting it and searching if user ,then if user exists sending success user can login auto: 
 const decodedToken = jwt.verify(tokenFromClient,jwt_secret);

    let userExist = await employees.findOne({email:decodedToken.email}) ;
     if (userExist){
        res.json({status:'success',data:userExist})
     }else{
        res.json({status:'unSuccessful'})
     }

}


module.exports = {postingEmployeeDetails,ValidationEmployee,validatingToken}