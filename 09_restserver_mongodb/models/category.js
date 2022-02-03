const {Schema, model} =  require('mongoose');

const categorySchema = new Schema({

   name : {
     type : String,
     require : [true, 'El campo nombre es obligatorio'],
     unique : true
   }, 
   
   status : {
      type : Boolean,
      default : true,
      require : true
   },  

   user : {
      type : Schema.Types.ObjectId,
      ref : 'User',
      require : true
   },

});


categorySchema.methods.toJSON =  function(){

   const {__v, ... data} = this.toObject();

   return data;
}

module.exports = model('category', categorySchema)