const { Router } = require('express');
const { cargarArchivo, updateImage, getImage, updateImageClaudinary } = require('../controllers/uploadController'); 
const { validateData } = require('../middleware/index');

const { collection_valid } = require('../helpers/index');

const { check } = require('express-validator');
 
const router = Router();

router.post('/',cargarArchivo); 

router.put('/:collection/:id',[
   check('collection').custom(c => collection_valid(c, ['users','products'])),
   check('id', 'ID invalido').isMongoId(), 
   // check('archivo', 'el archivo es obligatorio').not().isEmpty(),
   validateData
],updateImageClaudinary); 
// ],updateImage); 

router.get('/:collection/:id',[
   check('collection').custom(c => collection_valid(c, ['users','products'])),
   check('id', 'ID invalido').isMongoId(),  
   validateData
],getImage); 

module.exports = router;