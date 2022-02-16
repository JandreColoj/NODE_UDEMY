
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const fileUpload = require('express-fileupload');
const {dbConection} = require('../config/database');

const {socketController} = require('../sockets/socketController');

class Server{

   constructor(){
      this.app = express();
      this.port = process.env.PORT;

      this.paths = {
         'auth'       : '/api/auth',
         'categories' : '/api/categories',
         'users'      : '/api/users',
         'product'    : '/api/product',
         'search'     : '/api/search',
         'upload'     : '/api/upload',
      }; 

      //SOCKET IO
      this.server = require('http').createServer(this.app);
      this.io     = require('socket.io')(this.server);

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

      //Fileupload
      this.app.use(fileUpload({
         useTempFiles : true,
         tempFileDir : '/tmp/'
      }));
   }

   routes(){  
      this.app. use(this.paths.auth, require('../routes/auth'));
      this.app. use(this.paths.users, require('../routes/users'));
      this.app. use(this.paths.categories, require('../routes/category'));
      this.app. use(this.paths.product, require('../routes/product'));
      this.app. use(this.paths.search, require('../routes/search'));
      this.app. use(this.paths.upload, require('../routes/upload'));
   }

   listen(){

      this.server.listen(this.port, () => {
         console.log(`Listening at http://localhost:${this.port}`)
       })
       
   }

}

module.exports = Server;