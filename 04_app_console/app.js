const { new_menu, pausa, read_input, select_tarea, confirmation, multi_select_tarea } = require("./controllers/inquirer"); 
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

const colors = require('colors');  

 
const main = async() => { 

   let option = '';

   const tareas = new Tareas(); 
   let list_tareas = [];

   do{

      console.clear();
      option = await new_menu(); 

      switch (option) {
         case 1:

            let desc = await read_input('Ingrese la tarea'); 
            const tarea = new Tarea(desc); 
            tareas.add_tarea(tarea); 

            break; 

         case 2:
               tareas.list_tareas;
            break;
     
         case 3:
               tareas.list_tareas_complete(false); 
            break;
     
         case 4:
               tareas.list_tareas_complete(true); 
            break;
         case 5:

            const tareas_select = await multi_select_tarea(tareas.list_tareas );
            
            tareas.complete_tareas(tareas_select);
 
            break;
     
         case 6:
               console.clear();

               const tarea_select = await select_tarea( tareas.list_tareas ); 
 
               if (tarea_select!='0') {
                  let confirm = await confirmation('Estas seguro?');

                  if(confirm){
                     tareas.deleteTarea(tarea_select);
                     console.log('Tarea eliminada'); 
                  } 
               }

            break;
      
         default:
            break;
      }

      await pausa();
 
   }while(option!=0);
  
}

main();