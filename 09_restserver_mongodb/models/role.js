const {Schema, model} =  require('mongoose');

const rolSchema = new Schema({

   rol : {
     type : String,
     require : [true, 'El campo rol es obligatorio']
   }, 
   
   status : {
      type : Boolean,
      default : true
   },  

});

module.exports = model('Role', rolSchema)