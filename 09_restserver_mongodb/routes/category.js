const { Router } = require('express');
const { listCategories, createCategory, getCategory } = require('../controllers/categoryController');
const { check } = require('express-validator');

const {validateData, validateJWT } = require('../middleware/index');
 
const { existCategory } = require('../helpers/db-validators');

const router = Router();


/**
 * {{url}}/api/categorias
 * 
 * **/

router.get('/',[
   validateJWT
],
listCategories);


router.get('/:id',[
   check('id', 'no es id Valido').isMongoId(),
   check('id').custom(existCategory),
   validateData
],getCategory);

router.post('/',[
   validateJWT,
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   validateData
],
createCategory);


 
module.exports = router;