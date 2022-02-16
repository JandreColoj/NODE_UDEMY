const {Schema, model} =  require('mongoose');

const userSchema = new Schema({

   name : {
     type : String,
     require : [true, 'El campo nombre es obligatorio']
   }, 
   email : {
      type : String,
      require : [true, 'El campo correo es obligatorio'],
      unique : true
   }, 
   password : {
      type : String,
      require : [true, 'El campo contrasenia es obligatorio']
   }, 
   image : {
      type : String
   }, 
   rol : {
      type : String,
      require : [true, 'El campo rol es obligatorio'],
      emun : ['admin', 'user', 'operational']
   }, 
   status : {
      type : Boolean,
      default : true
   }, 
   google : {
      type : Boolean,
      default : false
   }, 

});

userSchema.methods.toJSON =  function(){

   const {__v, password, _id, ... usuario} = this.toObject();

   usuario.uid = _id;   

   return usuario;
}

module.exports = model('User', userSchema)