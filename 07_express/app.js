require('dotenv').config();
var hbs = require('hbs');

const express = require('express')
const app = express()
const port = process.env.PORT;

//middlewear - static 
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

app.get('/', (req, res) => {
   res.render('home', {
      nombre : "Jose Andre",
      ciudad : "Guatemala",
   });
});

app.use(express.static(__dirname+'/public'));

app.get('/generic', (req, res) => {
   res.render('generic', {
      nombre : "Jose Andre",
      ciudad : "Guatemala",
   });
});

app.get('/elements', (req, res) => {
   res.render('elements', {
      nombre : "Jose Andre",
      ciudad : "Guatemala",
   });
});

app.use((req, res, next) =>{
   res.status(404).sendFile(__dirname+'/public/404.html');
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
