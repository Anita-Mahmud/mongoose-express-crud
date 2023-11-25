import { TOrders, TUser } from "./user.interface";
import { User } from "./user.model";

// user create in db
const createUserInDB = async (user: TUser) => {
  const userInDB = await User.create(user);
  return userInDB;
};

// Retrieve a list of all users
const getAllUsersFromDB = async () => {
  const users = await User.find().select("username fullName age email address -_id");
  return users;
};

//Retrieve a specific user by ID
const getSingleUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const user = User.findOne({ userId }).select("-password -orders -_id");
    return user;
  } else {
    throw new Error("User not found");
  }
};

//Update user information
const updateUserInDB = async (userId: number, user: TUser) => {
  if (await User.isUserExists(userId)) {
    const updatedUser = await User.findOneAndUpdate({ userId }, user, {
      new: true,
    }).select("-password");
    return updatedUser;
  } else {
    throw new Error("User not found");
  }
};
//Delete user
const deleteUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const user = await User.deleteOne({ userId });
    return user;
  } else {
    throw new Error("User not found");
  }
};

//Add New Product in Order
const addProductInDB = async (userId: number, productData: TOrders) => {
  if (await User.isUserExists(userId)) {
    const order = await User.findOneAndUpdate(
      { userId },
      { $push: { orders: productData } }
    );
    return order;
  } else {
    throw new Error("User not found");
  }
};

// Retrieve all orders for a specific user
const getAllOrdersForUser = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const user = await User.findOne({userId }).select("orders -_id");
    return user?.orders;
  } else {
    throw new Error("User not found");
  }
};

//Calculate Total Price of Orders for a Specific User
const calculateTotalPrice = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const user = await User.findOne({ userId });

    if (user?.orders?.length > 0) {
      let total = 0;
      const totalPrice = user?.orders?.forEach((elem) => {
        total += elem.quantity * elem.price;
      });
      return total;
    } else {
      return "No products found";
    }
  } else {
    throw new Error("User not found");
  }
};

export const UserService = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
  addProductInDB,
  getAllOrdersForUser,
  calculateTotalPrice,
};
