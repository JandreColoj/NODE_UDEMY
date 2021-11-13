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



const getEmpleado = (id) =>{
  
   return new Promise((resolve, reject) =>{

      const empleado = empleados.find((element) => element.id == id);

      empleado 
               ? resolve(empleado.nombre) 
               : reject(`empleado con id ${id} no existe`);

   }); 

};


const getSalario = (id, empleado) =>{
  
   return new Promise((resolve, reject) =>{

      const salario = salarios.find((element) => element.id == id);

      salario 
            ? resolve(salario.cantidad, empleado) 
            : reject(`empleado con id ${id} no tiene salario`);
   }); 

};

const id = 4;
let name;

getEmpleado(id)
         .then(function(empleado){
            name = empleado;
            return getSalario(id);
         })
         .then(function(salario){
            console.log(`El empleado ${name} tiene un salario de ${salario}`);         
         })
         .catch(function(err) {
            console.log(err);
         });