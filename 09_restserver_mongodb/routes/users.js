const { Router } = require('express');
const { listUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { body, validationResult, check } = require('express-validator');

const {validateData, validateJWT, isAmdin, rolAuth } = require('../middleware/index');

const { rolValid, emailExist, existUser } = require('../helpers/db-validators');

const router = Router();

router.get('/', listUsers);

//tercer argumento son los middleware
router.post('/',[
   check('email', 'El correo no es valido').isEmail(),
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   check('password', 'La contraseña es obligatorio, minimo 6 letras').not().isEmpty().isLength({min:6}),
   // check('rol', 'Agrega un rol valido').isIn(['admin','operativo', 'user']),
   check('rol').custom(rolValid),
   check('email').custom(emailExist),
   validateData
],createUser);

router.put('/:id',[
   check('id', 'no es id Valid').isMongoId(),
   check('id').custom(existUser),
   check('rol').custom(rolValid),
   validateData
],updateUser);

router.delete('/:id',[
   validateJWT,
   // isAmdin,
   rolAuth(['admin', 'user', 'operativo']),
   check('id', 'no es id valid').isMongoId(),
   check('id').custom(existUser),
   validateData
], deleteUser);


module.exports = router;