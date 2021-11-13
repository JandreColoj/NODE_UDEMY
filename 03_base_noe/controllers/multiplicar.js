const fs = require('fs');
const colors = require('colors');


const multiplicar = (base = 1, listar, limite)=>{

   return new Promise((resolve, reject) =>{
 
      let salida = '';
      let impresion = '';
   
      for(let index = 1; index <= limite; index++){
         salida += `${base} X ${index} = ${base*index} \n`;   
         impresion += `${colors.green(base)} X ${colors.green(index)} = ${colors.red( colors.bold(base*index))} \n`;   
      }     
   
      if(listar){
         console.log(impresion);
      }

      try{

         let name = `ouput/tabla-${base}.txt`;

         fs.writeFileSync(name, salida);
         
         resolve(name) 

      }catch (error) {
         reject(error);
      }; 
 
   }); 

}

const sumar = async(num1, num2)=>{

   try{
 
      let salida = `${num1}+ ${num1} = ${num1+num2}`;
      let name = `suma.txt`;

      fs.writeFileSync(name, salida);

      return name

   }catch (err){

      throw err;
   }

}

module.exports = {
   multiplicar : multiplicar,
   sumar : sumar,
};