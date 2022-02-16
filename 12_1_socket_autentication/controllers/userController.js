const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs'); 


//List user with paginate
const listUsers = async(req, res = response ) => {
 
   const {limit = 5, page = 1} = req.query;

   const query = {status:true};

   // const users = await User.find(query)
   //                         .skip((Number(page)-1)*Number(limit))
   //                         .limit(Number(limit));

   // const total = await User.countDocuments(query);


   const [total, users] = await Promise.all([

      User.countDocuments(query),

      User.find(query)
         .skip((Number(page)-1)*Number(limit))
         .limit(Number(limit))

   ]);

   res.status(200).json({  
      users,
      total,
   });
}

const createUser = async (req, res = response ) => {

   const {name, email, password, rol} = req.body;

   const user = new User({name, email, password, rol});

   const salt = bcrypt.genSaltSync(10); 
   user.password = bcrypt.hashSync(password, salt);

   await user.save();

   res.status(200).json({
      'data' :  user
   });
}

const updateUser = async (req, res = response) => {

   const id_user = req.params.id;

   const {_id, password, email, ... body} = req.body;
 
   if(password){
      const salt = bcrypt.genSaltSync(10); 
      body.password = bcrypt.hashSync(password, salt);
   }
 
   const user = await User.findByIdAndUpdate(id_user, body);

   res.status(200).json({
      'user' : user,
      'message' : 'user updated' 
   });
}

const deleteUser = async (req, res = response ) => {

   const id_user = req.params.id;
 
   const user = await User.findByIdAndUpdate(id_user, {status:false});

   res.status(200).json({
      'user' : user,
      'message' : 'user delete ' 
   });
    
}


module.exports = {
   'listUsers'  : listUsers,
   'createUser' : createUser,
   'updateUser' : updateUser,
   'deleteUser' : deleteUser,
}