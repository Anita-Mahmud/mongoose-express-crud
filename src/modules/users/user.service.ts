import { TUser } from "./user.interface";
import { User } from "./user.model";

// user create in db
const createUserInDB = async(user: TUser)=>{
    const userInDB = await User.create(user);
    return userInDB;
}

// Retrieve a list of all users
const getAllUsersFromDB = async()=>{
    const users = await User.find().select('username fullName age email address');
    return users;
}

export const UserService = {
    createUserInDB,getAllUsersFromDB
}