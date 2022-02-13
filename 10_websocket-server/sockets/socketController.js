const socketController = (socket) => {

   console.log('cliente conectado', socket.id) ;

   socket.on('disconnect', () => {
      console.log('cliente desconectado');
   });

   socket.on('send-message', (payload, callback) =>{

      //emite un evento a todos los clientes conectado
      socket.broadcast.emit('send-message', payload); 

      //ejecutar callback
      const id = 12345678;
      callback({id, fecha: 'hoy'});        
   });
   
};


module.exports = {
   socketController
}