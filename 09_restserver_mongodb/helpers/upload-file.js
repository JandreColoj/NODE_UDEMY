const path = require('path');
const { v4: uuidv4 } = require('uuid'); 


const upload_file = (files, ext_permitible = ['png', 'jpg', 'txt', 'jpeg', 'gif'], carpeta = '')=>{

   return new Promise((resolve, reject)=>{

      const { archivo } = files;

      const name_first = archivo.name.split('.');
      const ext = name_first[name_first.length-1];

      if(!ext_permitible.includes(ext)){
         return reject(`La extencion ${ext} no es permitida`);
      }

      const name_file = uuidv4()+'.'+ext;

      uploadPath = path.join(__dirname, '../uploads/', carpeta , name_file);

      archivo.mv(uploadPath, (err)=>{

         if(err){
            return reject(err); 
         }

         resolve(uploadPath); 
      });

   });



}

module.exports = {
   upload_file: upload_file,
}