import { Request } from "express";
import { Response } from "express";

export const getusers = (req: Request, res: Response) =>{

   res.json({
      message:'getUsers'
   });

};


export const getuser = (req: Request, res: Response) =>{

   const {id } = req.params;

   res.json({
      message:'getUsers'
   });

};



export const createUser = (req: Request, res: Response) =>{

   const { body } = req;

   res.json({
      message:'create user - post',
      body : body 
   });

};


export const updateUser = (req: Request, res: Response) =>{

   const {id } = req.params;
   const { body } = req;

   res.json({
      message:'update user',
      body 
   });

};


export const deleteUser = (req: Request, res: Response) =>{

   const {id } = req.params; 

   res.json({
      message:'delete user', 
   });

};