import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req:Request, res:Response)=>{
    try{
        const userData = req.body;
        const result = await UserService.createUserInDB(userData);
        res.status(200).json({
            success: true,
            message: 'Student is created succesfully',
            data: result,
          });
        } catch (err: any) {
          res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
          });
        }
    }

export const UserController ={
    createUser
}