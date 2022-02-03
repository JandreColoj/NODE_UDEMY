const { response } = require('express');

const {Category} = require('../models/index');


//obtener categoria - populate

//actualizar categoria

//borrar categoria

//crate middleware, verifica id category

const listCategories = async (req, res = response) =>{

   const {limit = 5, page = 1} = req.query;

   const query = {status:true};

   const [total, categories] = await Promise.all([

      Category.countDocuments(query),

      Category.find(query)
         .populate("user", 'name')
         .skip((Number(page)-1)*Number(limit))
         .limit(Number(limit)).exec()

   ]);
 
   res.status(200).json({
      'total'      : total,
      'categories' : categories
   });

}

const getCategory = async (req, res = response ) => {

   const id_category = req.params.id;
 
   const category = await Category.findById(id_category).populate("user", 'name');

   res.status(200).json({
      'category' : category,
   });
    
}


const createCategory = async (req, res = response) =>{

   const name = req.body.name.toUpperCase();
   
   const existCategory = await Category.findOne({'name':name});

   if(existCategory){

      return res.status(200).json({
         'message_error' : `la categoria ${name} ya existe`
      });

   }

   try {

      const data = {
         'name' : name,
         'status' : true,
         'user' : req.userAuth._id,
      }
   
      const category = new Category(data);
      
      await category.save();
   
      res.status(201).json({    
         'category' : category
      });

      
   } catch (err) {
      
      return res.status(400).json({
         'message_error' : err
      });

   }

}
 

module.exports = {
   listCategories : listCategories,
   createCategory : createCategory,
   getCategory    : getCategory
}
