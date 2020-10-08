const express = require('express');
const exhbs = require('express-handlebars');
const session = require('express-session');
//const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors');
const sequelize = require('./sequelize');
const path = require('path');
const passport = require('passport');
const { dirname } = require('path');
const app = express();

app.use(express.static(path.resolve('public')));
app.use(cors());
//Passport config
require('./config/passport')(passport);

sequelize
  .sync()
  .then(() => console.log('Database is ready'))
  .catch((err) => cosnole.log(err));

//Handlebars
/*const hbs = exhbs.create({
  defaultLayout: false,
  layoutsDir: 'views/layouts/',
  exname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');*/

//bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Connect- flash
/*app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});*/

//Routes
app.use('/', require('./router/index'));
app.use('', require('./router/router'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, sequelize };
