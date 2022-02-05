const { response } = require('express');

const {Product, Category} = require('../models/index');


const listProducts = async (req, res = response) =>{

   const {limit = 5, page = 1} = req.query;

   const query = {status:true};

   const [total, products] = await Promise.all([

      Product.countDocuments(query),

      Product.find(query)
         .populate("user", 'name')
         .populate("category", 'name')
         .skip((Number(page)-1)*Number(limit))
         .limit(Number(limit)).exec()

   ]);
 
   res.status(200).json({
      'total'    : total,
      'products' : products
   });

}

const gerProduct = async (req, res = response ) => {

   const id = req.params.id;
 
   const product = await Product.findById(id).populate("user", 'name').populate("catetgory", 'name');

   res.status(200).json({
      'product' : product,
   });
    
}


const createProduct = async (req, res = response) =>{ 

   const name = req.body.name.toUpperCase();

   const existProduct = await Product.findOne({"name" : name});

   if(existProduct){

      return res.status(200).json({
         'message_error' : `el producto ${name} ya existe`
      });

   }

   try {

      const data = {
         name     : req.body.name.toUpperCase(),
         price    : req.body.price,
         category : req.body.category,
         user     : req.userAuth._id,
      }
   
      const product = new Product(data);
      
      await product.save();
   
      res.status(201).json({    
         'product' : product
      });

      
   } catch (err) {
      
      return res.status(400).json({
         'message_error' : err
      });

   }

}
 

const updateProduct = async (req, res = response) =>{

   const id = req.params.id;

   const {name, category, price} = req.body; 
  
   const data = {user : req.userAuth._id}
   
   name ? data.name =  name.toUpperCase() : '';
   price ? data.price =  price : '';

   if(category){
      data.category = category;
   }
   
   const product = await Product.findByIdAndUpdate(id, data, {new: true});

   res.status(200).json({
      'product' : product,
      'message' : 'product updated' 
   });

}


const deleteProduct = async (req, res = response) =>{

   const id = req.params.id;
      
   const data = {
      'status' : false, 
      'user'   : req.userAuth._id,
   }
 
   const product = await Product.findByIdAndUpdate(id, data, {new: true});

   res.status(200).json({
      'product' : product,
      'message' : 'product delete' 
   });

}


module.exports = {
   listProducts : listProducts,
   createProduct : createProduct,
   gerProduct    : gerProduct,
   updateProduct : updateProduct,
   deleteProduct : deleteProduct
}
