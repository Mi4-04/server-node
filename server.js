const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('flash')
const app = express();



app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// For Passport

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    }
})); // session secret


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(flash());
// функции маршрутизатора должны быть вызваны после инициализации паспорта, чтобы инициализировать паспорт, прежде чем фактически пытаться использовать их. 

require('./config/passport')(passport);
require('./app/router')(app, passport);


app.get('/', (req, res) => res.send('Hello'))

app.get('/orders', (req, res) => {
    res.send('Order page')
})







const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})