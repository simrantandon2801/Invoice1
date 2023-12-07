require('dotenv').config()
const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const cors = require('cors')
const port= 5000;

const connectToDatabase = require('./db');
connectToDatabase();


const admin=require('./admin')
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/admin',admin)




app.listen(port,function(){
    console.log(`server listening on port ${port}`)
});