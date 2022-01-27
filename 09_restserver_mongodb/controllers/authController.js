const bcryptjs = require('bcryptjs');
const { response } = require('express');
const User = require('../models/user');  

const { generateJWT } = require('../helpers/generateJWT');  
const { googleVerify } = require('../helpers/google-verify');  

 
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


const login_google = async(req, res = response) => {

   const { id_token } = req.body;
 
   try {
      
      const {name, picture, email} = await googleVerify(id_token);


      let user = await User.findOne({email});
      
      if(!user){

         const data = {
            name, 
            email,
            password : '',
            image :  picture,
            google: true
         };

         user = new User(data);

         await user.save();
      }


      if(!user.status){

         res.status(401).json({ 
            message: 'Contacte a soporte'
         });

      }

      const token = await generateJWT(user.id);
      
      res.json({
         token: token,
         user : user
      });

   } catch (error) {

      res.status(400).json({ 
         message_error: 'error al validar el token'
      });

   }


}

module.exports = { 
   'login' : login,
   'login_google' : login_google
}