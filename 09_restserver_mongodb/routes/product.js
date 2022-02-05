const { Router } = require('express');
const { createProduct, listProducts, gerProduct, updateProduct, deleteProduct} = require('../controllers/productController');
const { check } = require('express-validator');

const {validateData, validateJWT, rolAuth } = require('../middleware/index');
 
const { existCategory, existProduct } = require('../helpers/db-validators');

const router = Router();


router.post('/',[
   validateJWT,
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   check('price', 'El precio debe ser un numero').isDecimal(),
   check('category', 'No es un ID valido').isMongoId(), 
   check('category').custom(existCategory),
   validateData
],
createProduct);

router.get('/',[
   validateJWT
],
listProducts);

router.get('/:id',[
   check('id', 'no es id Valido').isMongoId(),
   check('id').custom(existProduct),
   validateJWT,
   validateData
],gerProduct);

router.put('/:id',[
   validateJWT,
   check('id', 'no es id Valido').isMongoId(),
   check('id').custom(existProduct),
   check('category').optional().custom(existCategory),
   validateData
],updateProduct);


router.delete('/:id',[
   validateJWT, 
   rolAuth(['admin', 'user', 'operativo']),
   check('id', 'no es id valid').isMongoId(),
   check('id').custom(existProduct),
   validateData
], deleteProduct);


 
module.exports = router;