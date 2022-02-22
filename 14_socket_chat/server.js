
require('dotenv').config();
const express = require('express');
const cors    = require('cors');  

const {socketController} = require('./sockets/socketController');

class Server{

   constructor(){
      this.app = express();
      this.port = process.env.PORT;

      //SOCKET IO
      this.server = require('http').createServer(this.app);
      this.io     = require('socket.io')(this.server);

      this.paths = {
         'auth'       : '/api/auth', 
      };  

      //Middleware
      this.middlewares();
      
      //route
      this.routes();

      //sockets
      this.sockets();
   }


   async conectDB(){
      await dbConection();
   }

   middlewares(){
      //CORS
      this.app.use(cors());

      //read and listen
      this.app.use(express.json());
      
      this.app.use(express.static('public'));

   }

   routes(){  
      // this.app. use(this.paths.auth, require('../routes/auth')); 
   }


   sockets(){
 
      this.io.on("connection", socketController);

   }

   listen(){

      this.server.listen(this.port, () => {
         console.log(`Listening at http://localhost:${this.port}`)
       })
       
   }

}

module.exports = Server;