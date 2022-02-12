const {Schema, model} =  require('mongoose');

const productSchema = new Schema({

   name : {
     type : String,
     require : [true, 'El campo nombre es obligatorio']
   }, 
   
   status : {
      type : Boolean,
      default : true,
      required : true
   },  

   user : {
      type : Schema.Types.ObjectId,
      ref : 'User',
      required : true
   },

   price : {
      type : Number,
      default : 0
   }, 

   category : {
      type : Schema.Types.ObjectId,
      ref : 'Category',
      required : true
   },

   description : {
      type : String
   }, 

   disponible : {
      type : Boolean,
      default : true
   }, 

   image : {
      type : String
   },
    
});

productSchema.methods.toJSON =  function(){

   const {__v, ... data} = this.toObject();

   return data;
}

module.exports = model('Product', productSchema)