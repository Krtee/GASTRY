const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const supplierRouter = require('./routers/api/supplier.router');
const customerRouter = require('./routers/api/customer.router');

const config = require('./config/keys');

const compression = require('compression');
const path = require('path');

//Added to prevent use of deprecated method
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


// Passport config

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));


app.get("/", (req, res) => res.json({ message: "Server is running." }));

mongoose.connect(config.mongoURI)
    .then(res => console.log(res))
    .catch(err => console.log(err));
const connectione = mongoose.connection;

connectione.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

app.use('/supplier',supplierRouter);
app.use('/customer',customerRouter);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
