const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Users = require('../User').Users


module.exports = function(app, passport) {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    require('../config/passport')(passport)


    router.get('/signup', function(req, res) {
        res.render('signup')
    })

    router.get('/signin', function(req, res) {
        res.render('signin')
    })



    router.post('/signup', function(req, res, next) {

        const { email, name, surname, password, password2 } = req.body

        if (!email || !name || !surname || !password || !password2) {
            errors.push({
                message: 'Please fill in all fields'
            })

        }

        if (password !== password2) {
            errors.push({
                message: 'Passwords do  not match'
            })
        }

        if (password.length < 6) {
            errors.push({
                message: 'Password should be at least 6 characters'
            })
        }

        passport.authenticate('local-signup', {
            successRedirect: '/orders',
            failureRedirect: '/signup',
            failureFlash: true
        }, function(err, user, info) {
            if (user) {
                req.logIn(user, function(err) {
                    if (err) {
                        return next(err);
                    } else {
                        res.send({
                            success: true,
                            response: 'signup successful'
                        });
                    }
                });
            }

            if (!user) {
                res.send({
                    success: false,
                    response: 'Authentication Failed'
                });
            }

            if (err) {
                res.send({
                    success: false,
                    response: 'Error Authentication failed'
                })
            }
        })(req, res, next);
    });

    router.get('/logout', function(req, res) {
        req.session.destroy(function(err) {

            res.redirect('/');

        });

    })

    router.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/orders',

            failureRedirect: '/signin',
            failureFlash: true

        }

    ));


    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/');

    }

    app.get('/orders', isLoggedIn, function(req, res) {
        res.render('orders')
    });

    /* app.post('/signin', function(req, res) {
         Users.findOne({
             where: {
                 email: req.body.email
             }
         }).then((user) => {
             if (!user) {
                 return res.status
             }
         })
     })*/

}



/*const authController = require('./model/authcontroller')
module.exports = function(app, passport) {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

    app.get('/signup', authController.signup)
    app.get('/signin', authController.signin);

    app.get('/orders', authController.orders);

    app.get('/logout', authController.logout);
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/orders',

            failureRedirect: '/signup'
        }

    ))(req, res);


    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }

    app.get('/orders', isLoggedIn, authController.orders);

}*/
