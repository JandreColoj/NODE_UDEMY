const { response } = require('express');
const { upload_file } = require('../helpers/index');

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

   const {collection, id } = req.params;

   res.status(200).send({collection});
}

module.exports = { 
   cargarArchivo: cargarArchivo,
   updateImage: updateImage
}