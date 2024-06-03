const jwt=require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
//data is payload
const generateAuthToken=function(data){  // data == userDbInfo
     const token=jwt.sign({user:data},process.env.JWT_SECRET) //CAT is the unique key
     return token;
}

module.exports=generateAuthToken;