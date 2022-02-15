const lblEscritorio = document.querySelector('h1');
const btnAtender  = document.querySelector('button');
const lblTicket  = document.querySelector('small');
const divAlert  = document.querySelector('.alert');

const lblPendientes  = document.querySelector('#lblPendientes');



const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){

   window.location = 'index.html';
   throw new Error('El escritorio es obligatorio');

}


const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlert.style.display = 'none';


const socket = io();


socket.on('connect', () => {
   btnAtender.disabled = false;
});

socket.on('disconnect', () => {
   btnAtender.disabled = false;
});

socket.on('ticket-pendientes', (payload) => { 
   lblPendientes.innerText = payload;
});



btnAtender.addEventListener( 'click', () => {
 

   socket.emit('atender-ticket', {escritorio}, (response) =>{

      if(!response.status) {
         
         divAlert.style.display = '';

         lblTicket.innerText = 'Sin ticket ';

      }else{
         lblTicket.innerText = response.ticket.numero;
      }
      
   });
   

});