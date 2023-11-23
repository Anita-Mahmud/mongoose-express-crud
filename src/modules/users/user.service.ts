import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserInDB = async(user: TUser)=>{
    const userInDB = await User.create(user);
    return userInDB
}

export const UserService = {
    createUserInDB
}