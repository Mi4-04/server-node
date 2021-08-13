const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const keys = require('./keys');
const { Users } = require('../db/User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await Users.findByPk(payload.id, {
          where: {
            email: 'email',
            id: 'id',
          },
        });

        if (user) {
          done(null, user);
        } else {
          done(null, null);
        }
      } catch (err) {
        console.log(err);
      }
    }),
  );
};
