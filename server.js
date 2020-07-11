// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');

//GLOBALS
require('dotenv').config() 
const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/bookmarks';
const whitelist = [
    'http://localhost:1985',
    'andysbookmarks.herokuapp.com'
];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};


//DB CONNECTION
mongoose.connection.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log('connected to mongoose...'));

// MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json());
app.use(methodOverride('_method'))

// CONTROLLERS/ROUTES
const bookmarksController = require('./controllers/bookmarks.js');
app.use('/bookmarks', bookmarksController);


app.listen(PORT, ()=>{
    console.log(`Shhhhh, trying to read on port: ${PORT}`)
})