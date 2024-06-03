const jwt=require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
//data is payload
const generateAuthToken=function(data){  // data == userDbInfo
     const token=jwt.sign(
          JSON.stringify({user:{email:data.email, _id:data.id}}),
          process.env.JWT_SECRET,
     );
     return token;
}

module.exports=generateAuthToken;