
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

// retrieve users controller
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

// retrieve single user controller
const getSingleUser = async(req:Request,res:Response)=>{
  try{
    const {userId} = req.params;
    const result = await UserService.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    })
  }catch (error) {
    res.status(500).json({
      success: false,
      message: error.message|| 'something went wrong',
    });
  }
}
// update user controller
const updateUser =async(req:Request,res:Response)=>{
  try{
    const {userId} =req.params;
    const userData = req.body;
    const result = await UserService.updateUserInDB(userId,userData);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
      })
      }catch (error) {
        res.status(500).json({
          success: false,
          message: error.message|| 'something went wrong',
          });
          }
          }

export const UserController ={
    createUser,getUsers,getSingleUser,updateUser
}