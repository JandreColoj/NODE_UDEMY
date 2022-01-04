const { response } = require('express');

const listUsers = (req, res = response ) => {

   // const params = req.query;
   const {country, ciudad = 'N/A'} = req.query;

 
   res.status(200).json({
      'access' : 'success controller',
      'pais' : country,
      'ciudad' : ciudad,
   });
}

const createUser = (req, res = response ) => {

   const request = req.body;

   res.status(200).json({
      'name' : (request.name)
   });
}

const updateUser = (req, res = response) => {

   const id_user = req.params.id;

   res.status(200).json({
      'id_user' : id_user
   });
}

const deleteUser = (req, res = response ) => {
   res.status(200).json({
      'access' : 'success deleteUser'
   });
}


module.exports = {
   'listUsers'  : listUsers,
   'createUser' : createUser,
   'updateUser' : updateUser,
   'deleteUser' : deleteUser,
}