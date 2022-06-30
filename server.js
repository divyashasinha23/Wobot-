//Wobot.ai ASSIGNMENT

const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./connectDB/db');
const bodyParser = require('body-parser');
var app = express();

app.use(express.json());
const router = express.Router();

//MongoDB connection
dotenv.config();
connectDB();

const port = process.env.PORT || 3000

//test route
app.get('/', (req, res) => {
    res.send("server started")
})


//express configuration
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//routes configuration
var userRoute = require('./modules/user/route/index');
var productRoute = require('./modules/product/route/index')

userRoute(router)
productRoute(router)

app.use('/api/v1', router)

app.listen(port, () => {
    console.log("server started at port " + port);
})