const path = require('path');
const fs   = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');
const { upload_file } = require('../helpers/index');
const { Product, User } = require('../models/index');

const cargarArchivo = async(req, res = response) =>{

   if(!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send({message : 'No files were uploaded.'});
      return;
   }

   if(!req.files.archivo) {
      res.status(400).send({message : 'No files were uploaded.'});
      return;
   }
 
   try{

      const path = await  upload_file(req.files, ['txt'], 'files');
      
      return res.status(200).send({message : path});

   }catch (error) {
      return res.status(400).send({message : error});
   }
     
}

const updateImage = async(req, res = response)=>{

   const { collection, id  } = req.params;

   let modelo;

   switch ( collection ) {

       case 'users':

         modelo = await User.findById(id);

         if(!modelo ){
            return res.status(400).json({
                  msg: `No existe un usuario con el id ${ id }`
            });
         }
       
       break;

       case 'products':
         
         modelo = await Product.findById(id);

         if ( !modelo ) {
               return res.status(400).json({
                  msg: `No existe un producto con el id ${ id }`
               });
         }
       
       break;
   
       default:
           return res.status(500).json({ msg: 'Se me olvidó validar esto'});
   }

 
   if ( modelo.image){
       
       const pathImagen = path.join( __dirname, '../uploads', collection, modelo.image);
 
       if ( fs.existsSync( pathImagen ) ) {
           fs.unlinkSync( pathImagen );
       }
   }

   const nombre = await upload_file( req.files, undefined, collection );

   modelo.image = nombre;

   await modelo.save();

   res.json( modelo );
}

const getImage = async(req, res = response)=>{

   const { collection, id  } = req.params;

   let modelo;

   switch(collection){

      case 'users':

         modelo = await User.findById(id);

         if(!modelo){
            
            return res.status(400).json({
                  message: `No existe un usuario con el id ${ id }`
            });
         }
      
      break;

      case 'products':
        
         modelo = await Product.findById(id);

         if(!modelo){
            
            return res.status(400).json({
               message: `No existe un producto con el id ${ id }`
            });
         }
      
      break;
  
      default:
          return res.status(500).json({ message: 'Se me olvidó validar esto'});
   }


   if(modelo.image){
      
      const pathImage = path.join( __dirname, '../uploads', collection, modelo.image);

      if(fs.existsSync( pathImage ) ) {
          
         return res.sendFile(pathImage);
      }

   }

   const pathImage = path.join( __dirname, '../assets/no-image.jpg');     
   return res.sendFile(pathImage);

}


//updateImage claudinary
const updateImageClaudinary = async(req, res = response)=>{

   const { collection, id  } = req.params;

   let modelo;

   switch ( collection ) {

       case 'users':

         modelo = await User.findById(id);

         if(!modelo ){
            return res.status(400).json({
                  msg: `No existe un usuario con el id ${ id }`
            });
         }
       
       break;

       case 'products':
         
         modelo = await Product.findById(id);

         if ( !modelo ) {
               return res.status(400).json({
                  msg: `No existe un producto con el id ${ id }`
               });
         }
       
       break;
   
       default:
           return res.status(500).json({ msg: 'Se me olvidó validar esto'});
   }

 
   if(modelo.image){

      const name_array = modelo.image.split('/');

      const code_img = name_array[name_array.length-1];
      const [ public_id] = code_img.split('.');

      cloudinary.uploader.destroy(public_id);
   }

   const {tempFilePath} = req.files.archivo;
 
   const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

   modelo.image = secure_url;
   await modelo.save();

   res.json( modelo );
}






module.exports = { 
   cargarArchivo: cargarArchivo,
   updateImage: updateImage,
   getImage : getImage,
   updateImageClaudinary : updateImageClaudinary
}