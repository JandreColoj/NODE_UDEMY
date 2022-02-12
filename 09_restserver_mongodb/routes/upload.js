const { Router } = require('express');
const { cargarArchivo, updateImage } = require('../controllers/uploadController'); 
const { validateData } = require('../middleware/index');

const { check } = require('express-validator');
 
const router = Router();

router.post('/',cargarArchivo); 

router.put('/:collection/:id',[
   check('id', 'ID invalido').isMongoId(),
   check('collection').custom(c=>collection_valid(c,['users','products'])),
   validateData
],updateImage); 

module.exports = router;