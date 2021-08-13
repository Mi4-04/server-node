const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const sequelize = require('./sequelize');
const ordersRouter = require('./router/Orders');
const authRouter = require('./router/router');

const app = express();

app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

app.use(express.static(path.resolve('public')));
app.use(cors());
// Passport config
require('./config/passport')(passport);

sequelize
  .sync()
  .then(() => console.log('Database is ready'))
  .catch((err) => console.log(err));

// bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

// Passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes

app.use('', authRouter);
app.use('', ordersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, sequelize };
