/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserService } from "./user.service";
import userValidationSchema from "./user.validation";

// create user controller
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // validation using joi
    const { value } = userValidationSchema.validate(userData);
    const result = await UserService.createUserInDB(value);
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.details
    }
    });
  }
};

// retrieve users controller
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.details
    }
    });
  }
};

// retrieve single user controller
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description:error.details || "User not found!"
    }
    });
  }
};
// update user controller
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await UserService.updateUserInDB(userId, userData);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message|| "User not found",
      error: {
        code: 404,
        description: error.details ||"User not found!"
    }
    });
  }
};
// delete user controller
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // eslint-disable-next-line no-unused-vars
    const result = await UserService.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message ||"User not found",
      error: {
        code: 404,
        description: error.details ||"User not found!"
    }
    });
  }
};

// add product controller
const addProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const { userId } = req.params;
    // eslint-disable-next-line no-unused-vars
    const result = await UserService.addProductInDB(userId, productData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:error.message|| "User not found",
      error: {
        code: 404,
        description: error.details || "User not found!"
    }
    });
  }
};

// user product controller
const userProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getAllOrdersForUser(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: {
        orders: result,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message|| "User not found",
      error: {
        code: 404,
        description: error.details||"User not found!"
    }
    });
  }
};

// total price controller
const totalOrderPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.calculateTotalPrice(userId);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice: result,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message||"User not found",
      error: {
        code: 404,
        description:error.details|| "User not found!"
    }
    });
  }
};

export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addProduct,
  userProduct,
  totalOrderPrice
};
