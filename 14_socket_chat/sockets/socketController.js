 const { Users } = require('../controllers/userController');
const {createMessage} = require('../utilidades/utilidades');

 const users = new Users();


const socketController = (socket) => {

   socket.on('entrarChat', ({nombre, sala}, callback)=>{
 
      if(!nombre || !sala ){
         
         return callback({
            error : true,
            message : 'El nombre es necesario',
         })
      }

      //conectar usuario a una sala espesifica

      socket.join(sala);

      users.addPersona(socket.id, nombre, sala);
 
      socket.broadcast.to(sala).emit('listaPersonas', users.getPersonasSala(sala));

      socket.broadcast.to(sala).emit('crearMensaje',  {'name': 'admin', 'message': 'el usuario '+nombre+' se unio a la sala'}); 

      callback(users.getPersonas());
   });

   socket.on('disconnect', () => {
 
      let desconectado = users.removePersona(socket.id); 

      socket.broadcast.to(desconectado.sala).emit('crearMensaje', createMessage('admin',  `el usuario ${desconectado.nombre} salio del chat`));

      socket.broadcast.to(desconectado.sala).emit('listaPersonas', users.getPersonasSala(desconectado.sala));
   });
 
   

   socket.on('crearMensaje', (data, callback) => {  

      let persona = users.getPersona(socket.id);

      // console.log(users.getPersonas());
      // console.log(socket.id); 
 
      let message = createMessage(data.nombre, data.message);

      socket.broadcast.to(persona.sala).emit('crearMensaje',  message); 

      callback(message);
   });


   socket.on('mensajePrivado', (data) => {  
 
      let persona = users.getPersona(socket.id);
 
      let message = createMessage(data.nombre, data.message);
 
      socket.broadcast.to(data.para).emit('mensajePrivado',  message); 
   });


};


module.exports = {
   socketController
}