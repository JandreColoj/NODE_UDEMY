const { Router } = require('express'); 
const { check } = require('express-validator');
const { login, login_google, validarToken } = require('../controllers/authController'); 
const { validateData } = require('../middleware/validate-data');

const { validateJWT } = require('../middleware/index');
 

const router = Router();

router.post('/login',[
   check('email', 'El correo es obligatorio').not().isEmpty(),
   check('email', 'El correo no es valido').isEmail(), 
   check('password', 'La contraseña es obligatorio').not().isEmpty(),
   validateData
],login); 


router.post('/google',[ 
   check('id_token', 'id token es necesario').not().isEmpty(),
   validateData
],login_google);

router.get('/', validateJWT, validarToken)

module.exports = router;