const validateData = require('../middleware/validate-data');
const validateJWT = require('../middleware/validate-jwt');
const validateRol = require('../middleware/validate-rol.js');


module.exports = {
   ...validateData,
   ...validateJWT,
   ...validateRol,
}