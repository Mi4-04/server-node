const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const Users = require('../User').Users


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: keys.jwt
}

module.exports = (passport) => {

  passport.use(
    new JwtStrategy(options, async(payload, done) => {
      try{
const user = await Users.findByPk( payload.userId ,{where:{
email: 'email',
id: 'id'
}})

if(user){
  done(null, user)
}else{
  done(null, false)
}
}catch(err){
  console.log(err)
}    

    })
  )

}

