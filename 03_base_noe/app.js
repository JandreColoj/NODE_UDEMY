const {multiplicar, sumar} = require('./controllers/multiplicar');
const argv = require('./config/yargs');

const main = ()=>{
 
   let base = argv.base; 
   let listar = argv.listar; 
   let limite = argv.limite; 

   console.log(limite);

   multiplicar(base, listar, limite)
               .then(function(name_archivo){
                  console.log(name_archivo, 'multiplicacion creada');
               }).catch(function(err) {
                  console.log(err);
               });
}
    

main();
