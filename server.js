require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3300
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')


//Database connection
const url = "mongodb://localhost/pizza"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', () => {
    console.log("Database Connected Successfully")
});




//Session store
// let mongoStore = new MongoDbStore({
//     mongooseConnection: connection,
//     collection: 'sessions'
// })


//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        client: connection.getClient()
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hr for cookie expiration


}))

app.use(flash())
    //Assets 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Global Middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

//set Template Engine express layout
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')



require('./routes/web')(app)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})