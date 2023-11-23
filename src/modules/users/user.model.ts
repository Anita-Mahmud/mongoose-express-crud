import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser } from './user.interface';

const fullNameSchema = new Schema<TFullName>({
    firstName:{
        type: String,
        required: [true, 'First Name is required']
    },
    lastName:{
        type: String,
        required: [true, 'Last Name is required']
    }
});

const addressSchema = new Schema<TAddress>({
    street: {
        type: String,
        required: [true, 'Street is required']
    },
  city: {
    type: String,
    required: [true, 'City is required']
},
  country: {
    type: String,
    required: [true, 'Country is required']
}
});
const ordersSchema = new Schema<TOrders>({
    productName: {
        type: String,
        required: [true, 'Product Name is required']
    },
  price: {
    type: Number,
    required: [true, 'Price is required']
},
  quantity: {
    type: Number,
    required: [true, 'Quantity is required']
},
});
const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User Id is required'],
    unique: true
},
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
},
  password:{
    type: String,
    required: [true, 'Password is required'],
},
  fullName: {
    type: fullNameSchema,
    required: [true, 'Full Name is required'],
},
  age: {
    type: Number,
    required: [true, 'Age is required'],
},
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
},
  isActive: {
    type: Boolean,
    required: [true, 'Active/Inactive is required'],
    
},
  hobbies: [
    {
        type: String,
        required: [true, 'Hobby is required']
        
    }
  ],
  address:{
    type: addressSchema,
    required: [true, 'Address is required']
    
},
  orders: [{
    type: ordersSchema,
    required: [true, 'Orders is required']
    
}]
});

export const User = model<TUser>('User',userSchema)