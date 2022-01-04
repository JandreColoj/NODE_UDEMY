
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

class Server{

   constructor(){
      this.app = express();
      this.port = process.env.PORT;
      this.route_users = '/api/users';

      //Middleware
      this.middlewares();
      
      //route
      this.routes();
   }

   middlewares(){
      //CORS
      this.app.use(cors());

      //read and listen
      this.app.use(express.json());
      
      this.app.use(express.static('public'));
   }

   routes(){  
      this.app. use(this.route_users, require('../routes/users'));
   }

   listen(){

      this.app.listen(this.port, () => {
         console.log(`Listening at http://localhost:${this.port}`)
       })
       
   }

}

module.exports = Server;