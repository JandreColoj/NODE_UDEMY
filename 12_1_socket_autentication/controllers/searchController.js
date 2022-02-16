const {response} = require('express');
const {ObjectId} =  require('mongoose').Types;

const {User, Product, Category} = require('../models/index');


const collectionValid = [
   'user',
   'product',
   'category',
   'role'
];

const searchUser = async(termino = '', res = response)=>{

   const isMongoDB = ObjectId.isValid(termino);

   if(isMongoDB){

      const user = await User.findById(termino);
 
      return res.status(200).json({
         results : user ? [user] : [] 
      });
     
   }

   const regexep = new RegExp(termino, 'i');

   const users = await User.find({
      $or : [{name: regexep}, {email: regexep}],
      $and : [{status : true}]
   });

   res.status(200).json({
      results : users
   });

}

const searchCategory = async(termino = '', res = response)=>{

   const isMongoDB = ObjectId.isValid(termino);

   if(isMongoDB){

      const category = await Category.findById(termino);
 
      return res.status(200).json({
         results : category ? [category] : [] 
      });
     
   }

   const regexep = new RegExp(termino, 'i');

   const category = await Category.find({name: regexep, status : true});

   res.status(200).json({
      results : category
   });

}

const searchProduct = async(termino = '', res = response)=>{

   const isMongoDB = ObjectId.isValid(termino);

   if(isMongoDB){

      const product = await Product.findById(termino);
 
      return res.status(200).json({
         results : product ? [product] : [] 
      });
     
   }

   const regexep = new RegExp(termino, 'i');

   const product = await Product.find({name: regexep, status : true}).populate('category', 'name');

   res.status(200).json({
      results : product
   });

}


const search =  (req, res = response)=>{

   const {collect, termino} = req.params;

   if(!collectionValid.includes(collect)){

      return res.status(400).json({
         message : 'Collect invalid', 
      })
   }

   switch (collect) {

      case 'user':
            searchUser(termino, res);
         break;

      case 'product':
            searchProduct(termino, res);
         break;

      case 'category':
            searchCategory(termino, res);
         break;
   
      default:
         res.status(500).json({
            message : 'serch not implement', 
         })
         
         break;
   } 

}

module.exports = {
   search: search
}