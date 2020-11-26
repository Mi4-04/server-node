const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../User').Users
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.signin =  async(req, res) => {
  const candidate = await Users.findOne({where: {
      email: req.body.email
  }})

  if(candidate){
      //Проверка пароля
const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
if(passwordResult){
    //Генерация токена, пароли совпали
    const token = jwt.sign({
        email: candidate.email,
        userId: candidate.id
    }, keys.jwt, {expiresIn: 60*60})

    res.status(200).json({
        token: `Bearer ${token}`
    })
}else{
    //Пароли не совпали
    res.status(401).json({
        message: 'Не верно указан email или пароль'
    })
}

  }else{
      //User not found
res.status(404).json({
    message: 'User not found'
})      
  }

}

module.exports.signup =  async (req, res) => {
   //email password name surname

   const candidate = await Users.findOne({where: {
       email: req.body.email
   }})

   if(candidate){

    //Если пользователь существует - error
    res.status(409).json({
        message: 'email is occupied by another user'
    })

   }else{
       //Create User
       const salt = bcrypt.genSaltSync(10)
       const password = req.body.password
const user = new Users({
    email: req.body.email,
    password: bcrypt.hashSync(password, salt),
    name: req.body.name,
    typeUser: req.body.typeUser,

})

try{
    await user.save()
    res.status(201).json(user)
}catch(err) {
    errorHandler(res, err)
}

   }

}

module.exports.loginOut = (req, res) => {

    req.logout();
    res.status(200).json({
        message: 'User is logout!'
    })

}
