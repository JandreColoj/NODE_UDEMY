const mongoose = require('mongoose');
 
const dbConection = async() =>{


   try {
      
      await mongoose.connect(process.env.MONGO_DB_ACCESS,{
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true
      });

      console.log('database online');

   } catch (err){

      console.log(err);
      throw new Error('Error al iniciar la conexion a la base de datos');
      
   }

}

module.exports = {
   'dbConection'  : dbConection, 
}