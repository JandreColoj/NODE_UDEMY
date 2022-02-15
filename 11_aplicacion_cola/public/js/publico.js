// Referencias del HTML
const lblTicket1  = document.querySelector('#lblTicket1'); 
const lblEscritorio1  = document.querySelector('#lblEscritorio1'); 
const lblTicket2  = document.querySelector('#lblTicket2'); 
const lblEscritorio2  = document.querySelector('#lblEscritorio2'); 
const lblTicket3  = document.querySelector('#lblTicket3'); 
const lblEscritorio3  = document.querySelector('#lblEscritorio3'); 
const lblTicket4  = document.querySelector('#lblTicket4'); 
const lblEscritorio4  = document.querySelector('#lblEscritorio4'); 


const socket = io();

socket.on('connect', () => {
   // btnCrear.disabled = false;
});

socket.on('disconnect', () => {
//   btnCrear.disabled = true;
});


socket.on('status-actual', (payload) => { 


   const audio = new Audio('./audio/new-ticket.mp3');
   audio.play();


   const [ticket_1, ticket_2, ticket_3, ticket_4] = payload;
 
   if(ticket_1){
      lblTicket1.innerText      = 'Ticket '+ticket_1.numero;
      lblEscritorio1.innerText  = ticket_1.numero;
   }

   if(ticket_2){
      lblTicket2.innerText      = 'Ticket '+ticket_2.numero;
      lblEscritorio2.innerText  = ticket_2.numero;
   }

   if(ticket_3){
      lblTicket3.innerText      = 'Ticket '+ ticket_3.numero;
      lblEscritorio3.innerText  = ticket_3.numero;
   }

   if(ticket_4){
      lblTicket4.innerText      = 'Ticket '+ ticket_4.numero;
      lblEscritorio4.innerText  = ticket_4.numero;
   }
 
 
});
 