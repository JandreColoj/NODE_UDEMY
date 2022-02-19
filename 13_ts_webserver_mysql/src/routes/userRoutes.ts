import { Router } from "express";
import { getusers, getuser, createUser, updateUser, deleteUser } from '../controller/userController';


const router = Router();


router.get('/', getusers);

router.get('/:id', getuser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);




export default router;