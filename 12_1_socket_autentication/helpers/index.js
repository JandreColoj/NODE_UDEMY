const db_validators = require('./db-validators'); 
const genterate_jwt = require('./generateJWT'); 
const google_verify = require('./google-verify'); 
const parse_jwt     = require('./parse-jwt'); 
const upload_file   = require('./upload-file'); 



module.exports = {
   ...db_validators,
   ...genterate_jwt,
   ...google_verify,
   ...parse_jwt,
   ...upload_file
};