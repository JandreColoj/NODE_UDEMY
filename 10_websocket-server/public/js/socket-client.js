const online = document.querySelector('#online');
const ofline = document.querySelector('#ofline');

const tx_message = document.querySelector('#tx_message');
const btn_text   = document.querySelector('#btn_text');


const socket = io();


socket.on('connect', ()=>{

   console.log('conectado');

   ofline.style.display = 'none';
   online.style.display = '';
});

socket.on('disconnect', ()=>{

   console.log('desconectado');

   ofline.style.display = '';
   online.style.display = 'none'; 
});


socket.on('send-message', (payload)=>{

   console.log('mensaje recibido', payload);
 
});

btn_text.addEventListener('click', ()=>{

   const message = tx_message.value;

   const payload = {
      'id'  : 132456,
      'message' : message
   }

   //ejecuta el collback despues de envair el mensaje
   socket.emit('send-message', payload, (data) =>{
      console.log('desde el server',data);
   });

})