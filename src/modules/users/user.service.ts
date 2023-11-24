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

//Retrieve a specific user by ID
const getSingleUserFromDB = async(userId: number)=>{
    if(await User.isUserExists(userId))
    {
        const user = User.findOne({userId}).select('-password -orders');
        return user;
    }
    else{
        throw new Error('User does not exists');
    }
}
//Update a user by ID
const updateUserInDB = async(userId: number, user: TUser)=>{
    if(await User.isUserExists(userId))
    {
        const filter = { userId: userId };
        const updatedUser = await User.findOneAndUpdate(filter, user, {new: true}).select('-password');
            return updatedUser;
            }
            else{
                throw new Error('User does not exists');
                }
}


export const UserService = {
    createUserInDB,getAllUsersFromDB,getSingleUserFromDB,updateUserInDB
}