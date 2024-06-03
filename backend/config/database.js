const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_url);
      console.log(
        `Connected to Mongodb Database ${mongoose.connection.host}`
      );
    } catch (error) {
      console.log(`MONGO Connect Error ${error}`);
    }
};

module.exports = connectDB;
