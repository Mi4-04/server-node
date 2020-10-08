const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const path = require('path');
//const fs = require('fs');
//User model
const Users = require('../User').Users;

const staticPath = path.resolve('public');

//Signin Page
//router.get('/signin', passport.authenticate('local'),(req, res) => res.render());

//Signup Page

//router.get('/signup', (req, res) => res.render(express.static(staticPath)));

//Signup Hanlde
router.post('/signup', (req, res) => {
  const { name, email, password, password2, surname } = req.body;
  console.log(req.body);
  // res.send('pass');
  Users.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (!user) {
      /* {
      res.render(user, {
        // errors,
        name,
        password,
        password2,
        email,
        surname,
      });
    } else */
      const newUser = new Users({
        name,
        email,
        password,
        surname,
      });
      //Hash Password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then((user) => {
              //req.flash('success_msg', 'You are now regester');
              res.json(user);
              //res.redirect('/signin');
            })
            .catch((err) => console.log(err));
        }),
      );
      //console.log(newUser);
      //res.send('hello');
    }
  });
});

//Signin Handel
router.post(
  '/signin',
  passport.authenticate('authtoken', {
    session: false,
    optional: false,
  }),
);
/*router.post('/signin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/orders',
    failureRedirect: '/signin',
    failureFlash: true,
  })(req, res, next);
});*/

//Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  // req.flash('success_msg', 'You are Logout');
  res.redirect('/signin');
});
/* let errors = [];

  //Check require fields
  if (!email || !password || !password2 || !name || !surname) {
    errors.push({ msg: 'Please fill in all fields' });
  }*/

//Check password match
/* if (password !== password2) {
    errors.push({
      msg: 'Passwords do not match',
    });
  }*/

/*if (errors.length > 0) {
    res.render('signup', {
      errors,
      name,
      password,
      password2,
      email,
      surname,
    });
  } else {
   
  }*/

module.exports = router;
