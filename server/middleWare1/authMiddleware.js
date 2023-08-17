const jwt = require('jsonwebtoken');
const employees = require('../model/agroEmployeeModel')


// //middleware function 
const authMiddleware = async (req, res, next) => {
    try {
        //getting accessToken from frontEnd by headers
        const accessTokenFromHeaders = req.headers['authorization'];
        const accessToken = accessTokenFromHeaders.split(' ')[1];
        let decodedMail = await jwt.verify(accessToken, process.env.jwt_secret_token, (error, decode) => { return decode.email })
      
        let findIfAccessToken = await employees.findOne({email:decodedMail});
        let matchingTokens = findIfAccessToken.tokens.some((t)=> t.accessToken===accessToken);

        if(matchingTokens === true){
            next();
        }else{
            console.log('n4......');
            res.status(401).json({ status: 'wrong user', message: 'unAuthorised User' });
        }
    } catch (error) {
        console.log('....n2')
        res.status(401).json({ message: 'Unauthorised' })
    }
}

module.exports = authMiddleware