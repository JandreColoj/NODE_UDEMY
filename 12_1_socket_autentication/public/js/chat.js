
let user = null;
let socket = null;



//referene
const txtUid     = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje'); 
const ulUsuarios = document.querySelector('#ulUsuarios'); 
const ulMensajes = document.querySelector('#ulMensajes'); 
const ulMensajesPrivado = document.querySelector('#ulMensajesPrivado'); 
const btnSalir   = document.querySelector('#btnSalir'); 


const validarJWT = async()=>{

   const token = localStorage.getItem('token')  || '';

   console.log(token);

   if (token.length<=10) {

      window.location = 'index.html';
      throw new Error('No hay token ')
   }

   var url = 'http://localhost:8080/api/auth/';

   const resp = await fetch(url, { 
      headers : {'Authorization' : token},
   });

   const {userAuth: userDB, token : tokenDB} = await resp.json();

   localStorage.setItem('token', tokenDB) 

   usuario = userDB; 
   document.title = usuario.name;


   await conectarSocket();
}


const conectarSocket = async()=>{

   socket = io({
      'extraHeaders':{
         'authorization' : localStorage.getItem('token')
      }
   });

   socket.on('connect', ()=>{
      console.log('conectado...');
   });

   socket.on('disconnect', ()=>{
      console.log('offline...');
   });
   

   socket.on('recibir-mensajes', mostrarMensajes);     
    

   socket.on('usuarios-activos', (payload)=>{
      // TODO:
      mostrarUsers(payload);

      // socket.on('usuarios-activos', mostrarUsers)
   });

   socket.on('mensaje-privado', ({de, mensaje})=>{
  
      let mensajesHTML = '';
   
      mensajesHTML += `
         <span class="text-primary"> ${de} </span>
         <span> ${mensaje} </span>
      `;
      

      ulMensajesPrivado.innerHTML = mensajesHTML;
   
   });

}


   const mostrarUsers = (usuarios = []) =>{

      console.log(usuarios);

      let usersHtml = '';

      usuarios.forEach(({name, uid}) => {

         usersHtml += `
            <li>

               <p>

                  <h5 class="text-success"> ${name} </h5>
                  <span class="fs-6 text-muterd"> ${uid} </span>

               </p>
            </li>

         `;
      });


      ulUsuarios.innerHTML = usersHtml;
   };

   const mostrarMensajes = (mensajes = []) =>{
   
      let mensajesHTML = '';

      mensajes.forEach(({nombre, mensaje}) => {

         mensajesHTML += `
            <li>

               <p>
                  <span class="text-primary"> ${nombre} </span>
                  <span> ${mensaje} </span>
               </p>
            </li>

         `;
      });

      console.log('reciviendo mensajes');

      ulMensajes.innerHTML = mensajesHTML;
   };



   txtMensaje.addEventListener('keyup', ({keyCode})=>{

      const mensaje = txtMensaje.value;
      const uid = txtUid.value;

      if(keyCode !=13){
         return;
      }

      if(mensaje.length===0){
         return;
      }

      console.log('enviarndo mensaje', mensaje);
      socket.emit('enviar-mensaje', {mensaje, uid});

      txtMensaje.value = '';
   });


   const main = async()=>{

      await validarJWT();

   }

   main();