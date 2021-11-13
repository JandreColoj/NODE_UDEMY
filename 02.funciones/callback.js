


const getUser = (id_user, callback) => {

   const user = {
      id : id_user,
      name : "Jose",
   }

   callback(user);

};


getUser(10, (user) =>{
   console.log('Bienvenido '+user.name);

});



const function1 = (fn)=>{

   setTimeout(() => {
      console.log("mensaje 1");
      fn();
   }, 1000);


}

function1(() => {

   console.log("mensaje 2");
})