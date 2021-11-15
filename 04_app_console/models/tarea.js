const { v4: uuidv4 } = require('uuid');

class Tarea{

   
   id = '';
   description= '';
   status = '';
   date_end = '';
 
   /**
    * 0 creado
    * 1 pendiente
    * 2 completado
    */

   constructor(desc){
      this.description = desc;
      this.id = uuidv4();
      this.status = 1;
   }

}


module.exports = Tarea;