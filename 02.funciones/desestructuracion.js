const month = {
   nombre : "enero",
   posicion : 1,
   signo : "capriconio",
};

const {nombre, signo, english="enery"} = month;

console.log(nombre, signo, english);


function imprimir ({nombre, signo, english="englishs"}){ 

   console.log(nombre, signo, english);
}

imprimir(month);



//DESESTRUCTURAR AREGLOS

const array = ["enero","febrero", "marzo"];
const [,mes] = array;

console.log(mes);