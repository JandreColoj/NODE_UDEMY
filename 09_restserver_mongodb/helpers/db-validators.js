const Role = require('../models/role');
const User = require('../models/user');

const rolValid = async (rol = '') => {
      
   const existRol = await Role.findOne({rol});
   
   if(!existRol){
      throw new Error(`El rol ${rol} no esta definido`)
   }
}


const emailExist = async (email = '') => {
      
   const existEmail = await User.findOne({email : email});
   
   if(existEmail){
      throw new Error(`El correo ${email} ya esta registrado`)
   }
}


const existUser = async (id) => {
      
   const existUserId = await User.findById(id);
   
   if(!existUserId){
      throw new Error(`El usuario con id ${id} no existe`)
   }
}

module.exports = {
   rolValid : rolValid,
   emailExist : emailExist,
   existUser : existUser
}