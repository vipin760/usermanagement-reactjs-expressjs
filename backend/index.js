const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const dbConnet = require('./config/config')

dotenv.config()
const app = express()
dbConnet()
const user_router = require("./router/User.Router")

app.use(express.json())
app.use("/api/user",user_router);

app.listen(process.env.port,()=>{
    console.log(`server conntected:${process.env.port}`);
})


