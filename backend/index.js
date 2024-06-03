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
app.use(cors({ origin: ['http://localhost:3000'] }));

app.use('/user', AuthRoute);
app.use('/playlist', PlayList);


let PORT=8080;
app.listen(8080,()=>{
    console.log(`server connected at port at ${PORT}`)
})