 const { Users } = require('../controllers/userController');


 const users = new Users();


const socketController = (socket) => {

   socket.on('entrarChat', ({nombre, sala}, callback)=>{
 
      if(!nombre){
         
         return callback({
            error : true,
            message : 'El nombre es necesario',
         })
      }

      users.addPersona(socket.id, nombre);
 
      socket.broadcast.emit('listaPersonas', users.getPersonas());

      callback(users.getPersonas());
   });

   socket.on('disconnect', () => {

      let desconectado = users.removePersona(socket.id); 

      socket.broadcast.emit('crearMensaje', {usuario: 'Admin', mensaje : `el usuario ${desconectado.nombre} salio del chat`});

      socket.broadcast.emit('listaPersonas', users.getPersonas());
   });

   // socket.on('send-message', (payload, callback) =>{

   //    //emite un evento a todos los clientes conectado
   //    socket.broadcast.emit('send-message', payload); 

   //    //ejecutar callback
   //    const id = 12345678;
   //    callback({id, fecha: 'hoy'});        
   // });
   
};


module.exports = {
   socketController
}