if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRouter = require('./v1/routes/auth');
const resetRouter = require('./v1/routes/reset');
const DB = require('./connectDB/database');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/v1/api',authRouter);
app.use('/v1/api/reset',resetRouter);

app.all('*', (req,res,next) => {
    res.status(404).send({status:false,message:'Page not found'});
    next();
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})