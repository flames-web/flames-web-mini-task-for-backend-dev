if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// const authRouter = require('./routes/auth');
const resetRouter = require('./routes/reset');
const itemRouter = require('./routes/item');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');
const paymentRouter = require('./routes/payment');
const orderRouter = require('./routes/order');
const DB = require('../connectDB/database');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/task';


const secret = process.env.SECRET;

// app.use('/v1/api/auth',authRouter);
app.use('/v1/api/reset',resetRouter);
app.use('/v1/api/items',itemRouter);
app.use('/v1/api/cart',cartRouter);
app.use('/v1/api/users',userRouter);
app.use('/v1/api',paymentRouter);
app.use('/v1/api',orderRouter);

app.all('*', (req,res,next) => {
    res.status(404).send({status:false,message:'Page not found'});
    next();
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})