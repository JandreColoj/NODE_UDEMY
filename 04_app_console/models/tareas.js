 const fs = require('fs');
 const colors = require('colors');  

class Tareas{


   _listado = {};
   base = 'database/info.json';

   constructor(){
      this._listado = {};
      
      if(fs.existsSync(this.base)){
         let rawdata = fs.readFileSync(this.base);
         this._listado = JSON.parse(rawdata);
      }

   }

   add_tarea(tarea){

      this._listado[tarea.id] = tarea;

      this.saveDB(this._listado);
   }


   get list_tareas(){

      const listado = [];

      Object.keys(this._listado).forEach((key, index) => { 
         listado.push(this._listado[key]);
      });

      listado.forEach(function callback(item, index) {
         console.log(`${index+1}.  ${item.description} :: ${item.status == 2 ? colors.green('completado') : colors.red('pendiante')}`);  
      });

      return listado;
 
   }

   list_tareas_complete(complete = true){

      const listado = [];

      Object.keys(this._listado).forEach((key, index) => { 
 
         if(complete && this._listado[key].status==2){
            listado.push(this._listado[key]);
         }else if(!complete && this._listado[key].status==1){
            listado.push(this._listado[key]);
         }

      });

      listado.forEach(function callback(item, index) {
         console.log(`${index+1}.  ${item.description} :: ${item.status == 2 ? colors.green('completado') : colors.red('pendiante')}`);  
      });
 

   }

   saveDB(data){      

      try{

         let name = `database/info.json`;

         fs.writeFileSync(name, JSON.stringify(data, null, 2),  'utf-8');
         
         return name;

      }catch (error) {
         reject(error);
      }; 

   }

   complete_tareas (ids = []){
 
      Object.keys(this._listado).forEach((key, index) => {  

         this._listado[key].status = 1;

         ids.forEach(id => {

            if(this._listado[key].id==id) {

               this._listado[key].status = 2;
               this._listado[key].date_end = new Date().toDateString();
            }

         });

      });
 

      this.saveDB(this._listado);
   }

   deleteTarea (id=''){

      if(this._listado[id]){
         delete this._listado[id];
      }

      this.saveDB(this._listado);
   }

}

module.exports = Tareas;