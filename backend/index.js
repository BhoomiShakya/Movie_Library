const express= require('express');
const cors= require('cors');
const app=express();
const connectDB=require("./config/database");
const AuthRoute= require('./routes/AuthRoutes');
const PlayList = require('./routes/PlayListRoutes');

connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/user', AuthRoute);
app.use('/playlist', PlayList);


const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server connected at port at ${port}`)
})