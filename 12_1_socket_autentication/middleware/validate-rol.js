const { response } = require('express'); 

const isAmdin = (req, res = response, next) => {
     
   if(!req.userAuth){

      return res.status(500).json({
         message: 'error al validar el token, user undefined'
      })
      
   }

   const {rol, name } = req.userAuth;

   console.log(rol);

   if(rol!='admin'){

      return res.status(401).json({
         message: `requiere de rol admin`
      }) 

   }

   next();
     
}

const rolAuth = (roles) => {
    
   return (req, res = response, next) => {
     
      if(!req.userAuth){
   
         return res.status(500).json({
            message: 'error al validar el token, user undefined'
         })
         
      }
   
      const {rol, name } = req.userAuth;
      
      if(!roles.includes(rol)){
   
         return res.status(401).json({
            message: `requiere de rol ${roles}`
         }) 
   
      }
   
      next();
        
   }
     
}

module.exports = {
   'isAmdin' : isAmdin, 
   'rolAuth' : rolAuth
}