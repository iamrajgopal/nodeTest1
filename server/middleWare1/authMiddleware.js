const jwt = require('jsonwebtoken');
const employees = require('../model/agroEmployeeModel')





// //middleware function 
const authMiddleware = async (req, res, next) => {
    try {
        const refreshTokenFromHeaders = req.headers['authorization'];
        const accessToken = refreshTokenFromHeaders.split(' ')[1];
        await jwt.verify(accessToken, process.env.jwt_secret_token, (error, decode) => {
            console.log(decode.email)
        })





    } catch (error) {
        console.log('....n2')
        res.status(401).json({ message: 'Unauthorised' })
    }
}

module.exports = authMiddleware