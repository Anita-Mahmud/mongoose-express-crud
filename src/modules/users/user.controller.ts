
import { Request, Response } from "express";
import { UserService } from "./user.service";
import userValidationSchema from "./user.validation";

// create user controller
const createUser = async (req:Request, res:Response)=>{
    try{
        const userData = req.body;
        const {value} = userValidationSchema.validate(userData)
        const result = await UserService.createUserInDB(value);
        res.status(200).json({
          success: true,
          message: "User created successfully!",
          data: result,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'something went wrong',
         
        });
      }
    }

// retrieve controller
const getUsers = async (req:Request,res:Response)=>{
  try{
    const result = await UserService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  }catch (error) {
    res.status(500).json({
      success: false,
      message:  'something went wrong',
      
    });
  }
}


export const UserController ={
    createUser,getUsers
}