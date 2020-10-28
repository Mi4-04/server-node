const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
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

  const user = await Users.findOne( payload.email ,{where:{
email: 'email',
id: 'id'
}})

if(user){
  done(null, user)
}else{
  done(null, null)
}
}catch(err){
  console.log(err)
}    

    })
  )

}

