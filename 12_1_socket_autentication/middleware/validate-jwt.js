const jwt = require('jsonwebtoken');
const { response } = require('express');

const User = require('../models/user');

const validateJWT = async (req, res = response, next) => {
     
   const token = req.header('Authorization'); 

   if(!token){

      return res.status(401).json({
         message : "el token de autorizacion es obligatorio"
      });

   }

   try {

      const {uid} = jwt.verify(token, process.env.APP_KEY);
      
      const user = await User.findById(uid);
 
      if(!user){
         return res.status(401).json({
            message : "token no valido - user not found"
         });
      }

      if(!user.status){
         return res.status(401).json({
            message : "token no valido - user false"
         });
      }

      req.userAuth = user;

      next();

   } catch (err) {
      
      console.log(err);

      return res.status(401).json({
         message : "token no valido"
      });
   }

}

module.exports = {
   'validateJWT'  : validateJWT,  
}