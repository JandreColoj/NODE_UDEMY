const { Router } = require('express'); 
const { check } = require('express-validator');
const { login } = require('../controllers/authController'); 
const { validateData } = require('../middleware/validate-data');
 

const router = Router();

router.post('/login',[
   check('email', 'El correo es obligatorio').not().isEmpty(),
   check('email', 'El correo no es valido').isEmail(), 
   check('password', 'La contraseña es obligatorio').not().isEmpty(),
   validateData
],login);


module.exports = router;