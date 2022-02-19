import express, { Application } from 'express';
import cors from 'cors';

import userRouter from '../routes/userRoutes';
 
import db from '../db/connection';


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

      this.dbConnection();

      this.middlewares();

      this.routes();
   }


   async dbConnection(){
      
      try{
         
         await db.authenticate();

         console.log('data base online');
         
      }catch (error:any) {
         throw new Error(error);
      }

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
         console.log(`npm i mysql2Listening at http://localhost:${this.port}`)
       })
       
   }

}

export default Server;