/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserModel,
} from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../app/config";

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, "Street is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
});
const ordersSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: [true, "Product Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
});
const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, "User Id is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, "Full Name is required"],
    _id: false,
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  isActive: {
    type: Boolean,
    required: [true, "Active/Inactive is required"],
  },
  hobbies: [
    {
      type: String,
      required: [true, "Hobby is required"],
    },
  ],
  address: {
    _id: false,
    type: addressSchema,
    required: [true, "Address is required"],
  },
  orders: [
    {
      _id: false,
      type: ordersSchema,
    },
  ],
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.orders;
    return ret;
  },
});

// static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

// password hashing
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<TUser, UserModel>("User", userSchema);
