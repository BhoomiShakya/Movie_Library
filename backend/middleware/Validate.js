const jwt = require('jsonwebtoken');

const validateUser = (req, res, next) => {
    const tkn = req.header('Authorization')?.replace('Bearer ', '');
    if (tkn === null || tkn === undefined) { // Check for null or undefined
        return res.status(401).json({ message: 'Unauthorized user. No token provided.' });
    }

    try {
        const decoding = jwt.verify(tkn, "HELLO");
        console.log("Decoded Token:", decoding); 
        // Log the decoded token
        req.user = decoding.user;
        next();
    } catch (error) {
        console.error("Error decoding token:", error);
        res.status(400).json({ message: 'Unauthorized user. token is invalid.' });
    }
};
module.exports=validateUser;
