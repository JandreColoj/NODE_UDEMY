const { new_menu, pausa, read_input, select_item, confirmation, multi_select_tarea } = require("./controller/inquirer");
const Busqueda = require("./models/Busqueda");
const colors = require('colors');  


const main = async() => { 

 
   let option = '';

   const busqueda = new Busqueda();
 
   do{
 
      option = await new_menu(); 

      switch (option) {
         
         case 1: 

            let search = await read_input('Ingrese la ciudad'); 

            let lugares =  await busqueda.search_ciudad(search);
            
            if (lugares.length>0) {
               
               let select = await select_item(lugares);

               if (select!='0') {
                  
                  let select_place = lugares.find(item => item.id == select);

                  
                  let clima = await busqueda.get_clima(select_place.lat, select_place.lng);
                  
                  busqueda.save_historial(select_place.nombre);


                  console.log('INFO \n');
                  console.log('Ciudad:',  select_place.nombre);
                  console.log('Lat:',  select_place.lat );
                  console.log('Lng:',  select_place.lng );
                  console.log('Temperatura:', clima.temp);
                  console.log('Descripcion:', clima.desc);

               }
               
            }
 
            
            break; 

         case 2: 

            console.log('\n');
            busqueda.historial.forEach((element, i) => {

               console.log(`${i+1}. ${colors.blue(element)}`);
               
            }); 

            break;
     
         case 3:  
            break; 
         default:
            break;
      }

      await pausa();
 
   }while(option!=0);
  
}

main();