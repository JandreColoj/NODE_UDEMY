const form = document.querySelector('form');
 

form.addEventListener('submit', ev =>{

   ev.preventDefault();


   const form_data = {};

   for (let el of form.elements) {
   
      if (el.name.length > 0) {
         
         form_data[el.name] = el.value;
      }
   }

   var url = 'http://localhost:8080/api/auth/login';

   fetch(url, {
      method : 'POST',
      body : JSON.stringify(form_data),
      headers : {'Content-Type' : 'application/json'},
   })
   .then(resp => resp.json())
   .then(({message, token}) => {

      if (message) {
         console.log(message); 

         localStorage.setItem('token', token);

         window.location = 'chat.html';
         console.log(token);    
      }

   })
   .catch(err =>{
      console.log(err);
   })
   
});


function onSignIn(googleUser) {


   var url = 'http://localhost:8080/api/auth/google';

   var profile = googleUser.getBasicProfile();
   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
   console.log('Name: ' + profile.getName());
   console.log('Image URL: ' + profile.getImageUrl());
   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

   var id_token = googleUser.getAuthResponse().id_token;
   const data = { id_token };

   fetch( url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( data )
   })
   .then( resp => resp.json() )
   .then( ({token}) => {

      console.log(token);
      localStorage.setItem('token', token);
      
   })
   .catch( console.log );
    
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}