const path = require('path');
const fs   = require('fs');

class Ticket {

   constructor(numero, escritorio){
      this.numero = numero;
      this.escritorio = escritorio;
   }
}

class TicketControl{
   constructor(){

      this.last = 0;
      this.now = new Date().getDate();
      this.tickets = [];
      this.last_4 = [];

      this.init();
   }

   get toJson(){

      return {
         "last" : this.last ,
         "now" : this.now,
         "ticktes" : this.tickets,
         "last_4" : this.last_4
      }

   }

   init(){

      const {now, ticktes, last, last_4} = require('../data/data.json');

      if(now==this.now){
        this.tickets = ticktes;
        this.last    = last; 
        this.last_4  = last_4;  
      }else{
         this.saveDB();
      }
 
   }

   saveDB (){
      const db_path = path.join(__dirname, '../data/data.json');

      fs.writeFileSync(db_path, JSON.stringify(this.toJson));
   }

   next(){
     
      this.last +=1; 
      const ticket = new Ticket(this.last, null);

      this.tickets.push(ticket);

      this.saveDB();

      return 'Ticket '+this.last;
   }

   atenderTicket(escritorio){

      //no ticket
      if(this.tickets.length===0){
         return null;
      }

      const ticket = this.tickets.shift(); 

      ticket.escritorio = escritorio;

      this.last_4.unshift(ticket);

      if(this.last_4.length > 4){
         this.last_4.splice(-1,1);
      }

      this.saveDB();

      return ticket;
   }



}

module.exports  = TicketControl;