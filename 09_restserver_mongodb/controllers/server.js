
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const {dbConection} = require('../config/database');

class Server{

   constructor(){
      this.app = express();
      this.port = process.env.PORT;

      this.paths = {
         'auth'       : '/api/auth',
         'categories' : '/api/categories',
         'users'      : '/api/users',
      }; 

      //conect db
      this.conectDB();

      //Middleware
      this.middlewares();
      
      //route
      this.routes();
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
      this.app. use(this.paths.auth, require('../routes/auth'));
      this.app. use(this.paths.users, require('../routes/users'));
      this.app. use(this.paths.categories, require('../routes/category'));
   }

   listen(){

      this.app.listen(this.port, () => {
         console.log(`Listening at http://localhost:${this.port}`)
       })
       
   }

}

module.exports = Server;