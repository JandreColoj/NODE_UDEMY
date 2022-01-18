const bcryptjs = require('bcryptjs');
const { response } = require('express');
const User = require('../models/user');  
const { generateJWT } = require('../helpers/generateJWT');  

 
const login = async (req, res = response ) => {

   try{

      const {email, password} = req.body;

      const user = await User.findOne({email:email});
   
      if(!user){
         return res.status(400).json({
            message_error:'usuario no esta registrado'
         })
      } 
   
      if(!user.status) {
         return res.status(400).json({
            message_error:'usuario no existe'
         })
      }

      const validPassword = bcryptjs.compareSync(password, user.password);

      if (!validPassword) {
         return res.status(400).json({
            message_error:'la contrasenia es incorrecta'
         })
      }

      const token = await generateJWT(user.id);
      
      res.json({
         message: 'login ok',
         token: token,
         user : user
      });

   }catch (err){
      
      console.log(err);

      res.status(500).json({
         message_error:'contacte a soporte'
      })
   }

}

module.exports = { 
   'login' : login
}