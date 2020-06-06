const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const expressValidator = require('express-validator');

require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const braintreeRoute = require('./routes/braintree');
const orderRoute = require('./routes/order');



const app = express();

const port = process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE,  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
})
    .catch((err) => {
        console.log(err.message);
});


//middleware

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(expressValidator());

app.use(cors());


app.use('/api', authRoute);
app.use('/api', userRoute);
app.use( categoryRoute);
app.use( productRoute);
app.use( braintreeRoute);
app.use( orderRoute);


app.listen( port,() => {
    console.log(`Listening on port : ${port}`)
})
