const Users = require('../User').Users;
const AuthTokenStrategy = require('passport-auth-token');

module.exports = function (passport) {
  passport.use(
    'authtoken',
    new AuthTokenStrategy(function (token, done) {
      AccessToken.findOne(
        {
          where: {
            id: token,
          },
        },
        function (error, accessToken) {
          if (error) {
            console.log(1, error);
            return done(error);
          }

          if (accessToken) {
            if (!token.isValid(accessToken)) {
              console.log(2);
              return done(null, false);
            }

            Users.findOne(
              {
                where: {
                  id: accessToken.id,
                },
              },
              function (error, user) {
                if (error) {
                  console.log(3, error);
                  return done(error);
                }

                if (!user) {
                  console.log(4);
                  return done(null, false);
                }
                console.log(5);
                return done(null, user);
              },
            );
          } else {
            return done(null);
          }
        },
      );
    }),
  );
};
//const passport = require('passport');
/*const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const sequelize = require('../sequelize');
const Users = require('../User').Users;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      //Match User
      Users.findOne({
        where: {
          email: email,
        },
      })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'That email is not regester' });
          }

          //Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Passport incorrect' });
            }
          });
        })
        .catch((err) => console.log(err));
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Users.findByPk(id, (err, user) => {
      done(err, user);
    });
  });
};*/
