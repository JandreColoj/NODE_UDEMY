class Users{
   constructor(){
      this.personas = [];
   }


   addPersona (id, nombre, sala) {

      let persona = {
         id : id, 
         nombre: nombre,
         sala
      };

      this.personas.push(persona); 

      return this.personas;
   }


   getPersona(id){

      let persona = this.personas.filter(persona => {
         return persona.id == id;
      })[0];


      return persona;
   }

   getPersonas(){
      return this.personas;
   }

   getPersonasSala(sala){
      //TODO:
     return this.personas.filter(item => item.sala == sala); 
   }


   removePersona(id){

      let personaRemove = this.getPersona(id);
 
      this.personas = this.personas.filter(item => item.id != id); 

      return personaRemove;
   }

   

}


module.exports = {
   Users : Users
};