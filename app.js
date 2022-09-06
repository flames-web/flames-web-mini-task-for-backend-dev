if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

const authRouter = require('./v1/routes/auth');
const resetRouter = require('./v1/routes/reset');
const itemRouter = require('./v1/routes/item');
const cartRouter = require('./v1/routes/cart');
const DB = require('./connectDB/database');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/task';

app.use(cookieParser());
const secret = process.env.SECRET;
const store = MongoStore.create({
  mongoUrl:dbUrl,
  secret,
touchAfter: 24 * 60 * 60,
})

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e)
})

app.use(session({
  store,
  name:'session',
  secret,
  resave:false,
  saveUninitialized:true,
  cookie:{
      expires: Date.now() * 1000 * 60*60*24*7,
      maxAge: 1000 * 60*60*24*7,
      httpOnly: true,
  }
}))


app.use('/v1/api',authRouter);
app.use('/v1/api/reset',resetRouter);
app.use('/v1/api',itemRouter);
app.use('/v1/api',cartRouter);

app.all('*', (req,res,next) => {
    res.status(404).send({status:false,message:'Page not found'});
    next();
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})