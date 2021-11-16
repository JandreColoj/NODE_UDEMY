const axios = require('axios').default;
const fs = require('fs');
require('dotenv').config()

class Busqueda{


   historial = [];

   constructor(){

      this.base = 'database/historial.json';

      if(fs.existsSync(this.base)){
         let rawdata = fs.readFileSync(this.base);
         this.historial = JSON.parse(rawdata); 
      } 

   }


   get paramMaxbox (){

      return {
         'access_token' : process.env.MAPBOX,
         'limit' : 5,
         'language' : 'es',

      }
   }
 

   async search_ciudad (lugar = ''){
 
      const url_base = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`;

      let response = [];
 
      try{

         const instance = axios.create({ 
            baseURL: url_base,
            params: this.paramMaxbox
         });

         const places =  await instance.get();

         return places.data.features.map(lugar =>({
            id     : lugar.id,
            nombre : lugar.place_name,
            lng    : lugar.center[0],
            lat    : lugar.center[1],
         }));

      }catch (error) {
        
         return  response;
      }
 
   }


   async get_clima(lat, lng){ 

      const url_base = `htts://api.openweathermap.org/data/2.5/weather`;

      let response = [];
 
      try{

         const instance = axios.create({ 
            baseURL: url_base,
            params: {
               'appid' : process.env.OPENWEATHER,
               'lon'   : lng,
               'lat'   : lat,
               'units' : 'metric',
               'lang'  : 'es',
            }

         });

         const weather =  await instance.get();
 
         // console.log(weather.data);
         return {
            desc  : weather.data.weather[0].description,
            min   : weather.data.main.temp_min,
            max   : weather.data.main.temp_max,
            temp  : weather.data.main.temp,
         };

      }catch (error) {
         console.log(error);
        
         return  response;
      }

   }


   save_historial(place){
    
      try{

         let path = `database/historial.json`;
         
         let exist = false;

         this.historial.forEach(item => {
            
            if (item==place) {
               exist = true;
            }

         });


         if (!exist) {
            this.historial.push(place);
         }
         

         fs.writeFileSync(path, JSON.stringify(this.historial, null, 2),  'utf-8');
          
      }catch (error) {
         
      }; 
   
   }

   get historial(){
    
      return this.historial.map(function(string) {
         return string.charAt(0).toUpperCase();;
      });

   }
}

module.exports = Busqueda;