

const empleados = [

   {
      id: 1,
      nombre: "karen"
   },
   {
      id: 2,
      nombre: "jose"
   },
   {
      id: 3,
      nombre: "juan"
   },
   {
      id: 4,
      nombre: "pedro"
   },
];


const salarios = [

   {
      id: 1,
      cantidad: 1000
   },
   {
      id: 2,
      cantidad: 2000
   },
   {
      id: 3,
      cantidad: 3000
   },
];



const getEmpleado = (id, fn) =>{

   const empleado = empleados.find((element) => element.id == id);
 
   if (empleado){
      fn(null, empleado);
   }else{
      fn(`empleado con id ${id} no existe`); 
   } 

};


const getSalario = (id, fn) =>{

   const salario = salarios.find((element) => element.id == id);
 
   if (salario){
      fn(null, salario.cantidad);
   }else{
      fn(`no existe salario para el usuario con  ${id}`); 
   } 

};

const id_user = 4;

getEmpleado(id_user, (err, empleado) =>{

   if(err){
      console.log(err);
      return;
   }

   getSalario(id_user, (err, salario) =>{

      if(err){
         console.error(err); 
         return;
      }
   
      console.log(`El empleado ${empleado.nombre} tiene un salario de ${salario}`);
   
   }); 

}); 





// getSalario(1, (err, salario) =>{

//    if(err){
//       console.error(err); 
//       return;
//    }

//    console.log(salario);

// }); 

