import express, { Application } from 'express';

import userRouter from '../routes/userRoutes';
import cors from 'cors';

export class example{}

class Server{

   private app: Application;
   private port: string; 

   private apiPaths = {
      user : '/api/users'
   }

   constructor(){
      this.app = express();
      this.port = process.env.PORT || '3000';

      this.middlewares();

      this.routes();
   }

   middlewares(){

      //CORS
      this.app.use(cors());

      //Lectura del body
      this.app.use(express.json());

      //Carpeta publica
      this.app.use(express.static('public'));
   }

   routes(){
      this.app.use(this.apiPaths.user, userRouter)
   }

   listen(){

      this.app.listen(this.port, () => {
         console.log(`--Listening at http://localhost:${this.port}`)
       })
       
   }

}

export default Server;