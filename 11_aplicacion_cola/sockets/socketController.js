
const TicketControl = require('../models/ticket');

const ticketControl = new TicketControl(); 

const socketController = (socket) => {

   socket.emit('last-ticket', ticketControl.last);
   socket.emit('status-actual', ticketControl.last_4);
   socket.emit('ticket-pendientes', ticketControl.tickets.length);

   socket.on('disconnect', () => {
      console.log('cliente desconectado');
   });

   socket.on('next-ticket', (payload, callback) =>{

      const next = ticketControl.next();

      socket.broadcast.emit('last-ticket', next); 
      socket.broadcast.emit('ticket-pendientes', ticketControl.tickets.length);
      
      callback(next);

   });

   socket.on('atender-ticket', ({escritorio}, callback) =>{
 
      if(!escritorio){
         return   callback({
            'status' : false,
            'message' : 'Escritorio obligatorio',
         });
      }

      const ticket = ticketControl.atenderTicket(escritorio);

      socket.broadcast.emit('status-actual', ticketControl.last_4);
      socket.emit('ticket-pendientes', ticketControl.tickets.length);
      socket.broadcast.emit('ticket-pendientes', ticketControl.tickets.length);

      if(!ticket){

         return callback({
            'status' : false,
            'message' : 'Ya no hay ticket pendiente',
         });

      }else{

         return callback({
            'status' : true,
            'ticket' : ticket,
         });

      } 
 

   });


};


module.exports = {
   socketController
}