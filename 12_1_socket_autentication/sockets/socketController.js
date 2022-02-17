const {socket} = require('socket.io');
const {comprobarJWT} = require('../helpers/index');
const {ChatMensajes} = require('../models/index')

const chatMensajes = new ChatMensajes();


const socketController = async(socket, io) => {

   //extraer header  
   const user = await comprobarJWT(socket.handshake.headers['authorization']);

   if(!user){
      return socket.disconnect();
   } 

   //io es general para todos
   chatMensajes.conectarUsuario(user);
   io.emit('usuarios-activos', chatMensajes.usuariosArr);
   socket.emit('recibir-mensajes', chatMensajes.ultimos10); 


   //sala de chat especial
   socket.join(user.id);


   socket.on('disconnect', () => {

      chatMensajes.desconectarUsuario(user.id);
      io.emit('usuarios-activos', chatMensajes.usuariosArr); 
   });


   socket.on('enviar-mensaje', ({uid, mensaje}) => {

      if(uid){
         //mensaje privado

         socket.to(uid).emit('mensaje-privado',{de: user.name, mensaje})

      }else{

         chatMensajes.enviarMensaje(user.id, user.name, mensaje);

         io.emit('recibir-mensajes', chatMensajes.ultimos10); 
      }
      

   });

   
};


module.exports = {
   socketController
}