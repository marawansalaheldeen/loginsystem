require('dotenv').config();
const express = require('express');
const cors = require("cors");
const userRouter = require('./api/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Enable cors
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.options('*', cors())

app.all('', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
});






app.use(userRouter);


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});

