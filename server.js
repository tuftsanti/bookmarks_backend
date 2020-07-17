// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// const methodOverride = require('method-override');
const bodyParser = require('body-parser');


//GLOBALS
require('dotenv').config() 
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const whitelist = [
    'http://localhost:1985',
    'http://localhost:3000',
    'https://andysbookmarks.herokuapp.com'
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
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true });
mongoose.connection.once('open', () => console.log('connected to mongoose...'));

// MIDDLEWARE
// app.use(cors(corsOptions));
app.use(cors())
app.use(express.json());
// app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))

// CONTROLLERS/ROUTES
const bookmarksController = require('./controllers/bookmarks.js');
app.use('/bookmarks', bookmarksController);

////Reroute from root to /bookmarks
app.get('/', (req, res) => {
    res.redirect('/bookmarks')
})

app.listen(PORT, ()=>{
    console.log(`Shhhhh, trying to read on port: ${PORT}`)
})