const http = require("http");


const server = http.createServer((req, res) => {

   console.log(req);


   person = {
      name : 'Jose',
      edad : 17
   };
   
   res.writeHead(200, { 'content-Type' : 'application/json'});
   res.write(JSON.stringify(person));
 
   res.end();
})
.listen(8080);


console.log('puerto 8080');

//  server.on('clientError', (err, socket) => {
//    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
// });
 
//  server.listen(8000);