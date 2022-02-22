class Users{
   constructor(){
      this.personas = [];
   }


   addPersona (id, nombre) {

      let persona = {
         id : id, 
         nombre: nombre
      };

      this.personas.push(persona); 

      console.log('add persona', this.personas);

      return this.personas;
   }


   getPersona(id){

      let persona = this.personas.filter(persona => {
         return persona.id = id;
      })[0];


      return persona;
   }

   getPersonas(){
      return this.personas;
   }

   getPersonasSala(sala){

      //TODO:
   }


   removePersona(id){

      let personaRemove = this.getPersona(id);

      console.log(this.personas);
      console.log(id);

      // this.personas = this.personas.filter(persona => persona.id != id);

      console.log('------------');
      console.log(this.personas);
      console.log('------------');

      return personaRemove;
   }

   

}


module.exports = {
   Users : Users
};