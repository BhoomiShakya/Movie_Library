const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateAuthToken = require('../utils/JwtTokenGenerator');
const SignUp = async (req, res) => {
    try {
        let Userr = req.body;

        let existingUser = await User.findOne({ email: Userr.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exist" });
        }

        Userr.password = await bcrypt.hash(Userr.password, 10); // 10 specifies the salt rounds

        let newUser = new User({
            name: Userr.name,
            email: Userr.email,
            password: Userr.password
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
        let UserrFormData = req.body;
        let UserrDbInfo = await User.findOne({ email: UserrFormData.email });
        if (!UserrDbInfo) {
            return res.status(404).json({ message: "User not found! Sign Up Please" });
        }

        let isPasswordValid = await bcrypt.compare(UserrFormData.password, UserrDbInfo.password);
        if (!isPasswordValid) {
            console.log("User password is incorrect")
            return res.status(401).json({ message: "Incorrect password" });
        }

        // JWT
        const token = generateAuthToken(UserrDbInfo);
        return res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUser = async (req, res) => {
    const { email } = req.params;
    try {
        const Userr = await User.findOne({ email });
        if (!Userr) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(Userr);
    } catch (error) {
        console.error('Error fetching Userr:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { SignUp, Login, getUser};
