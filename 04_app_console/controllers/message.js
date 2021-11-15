const colors = require('colors');
const readline = require ('readline');


const menu =   () => {

   return new Promise((resolve, reject) =>{

      console.log(colors.green('*******************************'));
      console.log(colors.red('****SELECIONA UNA OPCION*******'));
      console.log(colors.green('*******************************'));

      console.log('\n');


      console.log(`${colors.red("1")} Crear tarea`);
      console.log(`${colors.red("2")} Listar tareas`);
      console.log(`${colors.red("3")} Listar tareas pendientes`);
      console.log(`${colors.red("4")} Listar tareas completadas`);
      console.log(`${colors.red("5")} Completar tareas`);
      console.log(`${colors.red("6")} Borrar tareas`);
      console.log(`${colors.red("0")} Salir \n`); 


      var rl = readline.createInterface( process.stdin, process.stdout );

      rl.question('Selecciona una opcion: ', (option) => {
         rl.close();
         resolve(option); 
      }); 
      
   }); 
}

const pausa = () => {
   return new Promise((resolve, reject) =>{

      var rl = readline.createInterface( process.stdin, process.stdout );

      rl.question('Presione ENTER para continuar ', (option) => {
         rl.close();
         resolve(); 
      });

   }); 
}




module.exports = {
   menu : menu,
   pausa : pausa,
};