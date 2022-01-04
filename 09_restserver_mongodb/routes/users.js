const { Router } = require('express');
const { listUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');


const router = Router();

router.get('/', listUsers);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/', deleteUser);


module.exports = router;