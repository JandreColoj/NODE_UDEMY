const inquirer = require('inquirer'); 
const colors = require('colors');  



const new_menu = async() =>{
   
   console.log(colors.green('*******************************'));
   console.log(colors.red('****SELECIONA UNA OPCION*******'));
   console.log(colors.green('*******************************'));

   console.log('\n');

   const  options_menu = [
      {
         type : 'list',
         name : 'opcion',
         message : 'Que deseas hacer',
         choices : [
            {value : 1, name: '1. Crear tarea'},
            {value : 2, name: '2. Listar tareas'},
            {value : 3, name: '3. Listar tareas pendientes'},
            {value : 4, name: '4. Listar tareas completadas'},
            {value : 5, name: '5. Completar tareas'},
            {value : 6, name: '6. Borrar tareas'},
            {value : 0, name: '0. Salir  \n'}, 
         ],
      }

   ]
 
   const {opcion} =  await inquirer.prompt(options_menu);
                
   return opcion; 
}


const pausa = async() =>{
    
   const  questions = [
      {
         type: 'input',
         name: 'enter',
         message: `Presione ${colors.green('Enter')} para continuar`,
       },

   ]

   console.log('\n');
 
   const {opcion} =  await inquirer.prompt(questions);
                
   return opcion; 
}


const read_input = async(message) =>{
    
   const  questions = [
      {
         type: 'input',
         name: 'value',
         message: message,
         validate(value){

            if(value.length>0){
              return true;
            }
      
            return 'ingrese un dato valido';
         },
       },

   ]
  
   const {value} =  await inquirer.prompt(questions); 

   return value; 
}

const confirmation = async(message) =>{
    
   const  questions = [
      {
         type: 'confirm',
         name: 'ok',
         message: message,
       },

   ]
  
   const {ok} =  await inquirer.prompt(questions); 

   return ok; 
}



const select_tarea = async(tareas = []) => {

   let choices = [];

   tareas.forEach((item) => {
      choices.push({value : item.id , name: item.description});
   });

   choices.unshift({value : '0', name: 'Cancelar'})

   const  options_menu = [
      {
         type : 'list',
         name : 'tarea',
         message : 'Selecciona una tarea',
         choices : choices,
      }

   ]
 
   const {tarea} =  await inquirer.prompt(options_menu);
                
   return tarea; 
}

const multi_select_tarea = async(tareas = []) => {

   let choices = [];

   tareas.forEach((item) => {
      choices.push(
         {
            value : item.id , 
            name: item.description, 
            checked: (item.status == 2) ? true: false
         }
      );
   });
 

   const  options_menu = [
      {
         type : 'checkbox',
         name : 'ids',
         message : 'Selecciona las tareas',
         choices : choices,
      }

   ]
 
   const {ids} =  await inquirer.prompt(options_menu); 
   
   return ids; 
}

module.exports = {
   new_menu     : new_menu,
   read_input   : read_input,
   select_tarea : select_tarea,
   pausa        : pausa,
   confirmation : confirmation,
   multi_select_tarea : multi_select_tarea
};