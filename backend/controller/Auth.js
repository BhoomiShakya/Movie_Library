const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateAuthToken = require('../utils/jwtTokenGenerator');
const SignUp = async (req, res) => {
    try {
        let user = req.body;
        let existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exist" });
        }
        user.password = await bcrypt.hash(user.password, 10); // 10 specifies the salt rounds

        let newUser = new User({
            name: user.name,
            email: user.email,
            password: user.password
        });

        await newUser.save();
        res.status(201).json({ message: "Sign up successful" });

    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login
const Login = async (req, res) => {
    try {
        let userFormData = req.body;
        let userDbInfo = await User.findOne({ email: userFormData.email });
        if (!userDbInfo) {
            return res.status(404).json({ message: "User not found! Sign Up Please" });
        }

        let isPasswordValid = await bcrypt.compare(userFormData.password, userDbInfo.password);
        if (!isPasswordValid) {
            console.log("User password is incorrect")
            return res.status(401).json({ message: "Incorrect password" });
        }

        // JWT
        const token = generateAuthToken(userDbInfo);
        return res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUser = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching Userr:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { SignUp, Login, getUser};
