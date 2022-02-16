const { Router } = require('express');
const { listCategories, createCategory, getCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');
const { check } = require('express-validator');

const {validateData, validateJWT, rolAuth } = require('../middleware/index');
 
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
   validateJWT,
   validateData
],getCategory);

router.put('/:id',[
   check('id', 'no es id Valido').isMongoId(),
   check('id').custom(existCategory),
   check('name', 'el campo nombre es obligatorio'),
   validateJWT,
   validateData
],updateCategory);


router.post('/',[
   validateJWT,
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   validateData
],
createCategory);


router.delete('/:id',[
   validateJWT, 
   rolAuth(['admin', 'user', 'operativo']),
   check('id', 'no es id valid').isMongoId(),
   check('id').custom(existCategory),
   validateData
], deleteCategory);


 
module.exports = router;