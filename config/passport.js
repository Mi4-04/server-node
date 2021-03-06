//const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../User').Users
const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {



    passport.use('local-singup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        function(req, email, password, done) {
            const generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(100), null)
            }

            Users.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    })
                } else {
                    const userPassword = generateHash(password)

                    const data = {
                        email: email,
                        password: userPassword,
                        name: req.body.name,
                        surname: req.body.surname
                    }
                    Users.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false)
                        }

                        if (newUser) {
                            return done(null, newUser)
                        }
                    })
                }
            })
        }

    ))


    passport.use('local-sigin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            const isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass)
            }
            Users.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, {
                        message: 'Email does not exist'
                    })
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password'
                    })
                }

                const userinfo = user.get();
                return done(null, userinfo)
            }).catch(function(err) {
                console.log('Error: ', err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin '
                })
            })

        }
    ))

    passport.serializeUser(function(user, done) {
        console.log('Сериализация' + user)
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log('Десериализация', id)
        Users.findById(id).then(function(user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });

}

/*module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        console.log('Сериализация' + user)
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log('Десериализация', id)
        Users.findById(id, function(err, user) {
            done(err, user)
        })

    });

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            Users.findOne({
                where: {
                    email: email
                }
            }).then(function(user, err) {
                console.log('I entered' + user);
                console.log('I entered' + err);
                if (err) {
                    console.log(err);
                    return done(null, false);
                }

                if (user == null) {
                    Users.create({
                        email: email,
                        password: password
                    }).then(function(user) {
                        return done(null, user);
                    }).catch(function(err) {
                        return done(null, err);
                    });
                }

                if (user) {
                    return done(null, false);
                }

            })

        }));
}*/