const express= require('express');
const cors= require('cors');
const connectDB=require("./config/database");
const AuthRoute= require('./routes/AuthRoutes');
const PlayList = require('./routes/PlayListRoutes');

const dotenv = require('dotenv');
dotenv.config();

const app=express();
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/user', AuthRoute);
app.use('/playlist', PlayList);


const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server connected at port at ${PORT}`)
})