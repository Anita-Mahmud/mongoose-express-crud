import Joi from 'joi'

const fullNameValidationSchema = Joi.object({
    firstName: Joi.string().required().message('First Name is required'),
    lastName: Joi.string().required().message('Last Name is required'),
});

const addressValidationSchema = Joi.object({
    street: Joi.string().required().message('Street is required'),
    city: Joi.string().required().message('City is required'),
    country: Joi.string().required().message('Country is required')
});

const ordersValidationSchema = Joi.object({
    productName: Joi.string().required().message('Product Name is required'),
    price: Joi.number().required().positive().message('Price is required'),
    quantity: Joi.number().required().positive().message('Quantity is required')
});

export const userValidationSchema = Joi.object({
    userId: Joi.number().required().message('User Id is required'),
    username: Joi.string().required().message('Username is required'),
    password: Joi.string().required().message('Password is required'),
    fullName: fullNameValidationSchema.required().message('Full Name is required'),
    age:Joi.number().required().message('Age is required'),
    email: Joi.string().required().message('Email is required'),
    isActive: Joi.boolean().required().message('Active/Inactive is required'),
    hobbies: Joi.array().items(Joi.string()).required().message('Hobby is required'),
    address: addressValidationSchema.required().message('Address is required'),
    orders: Joi.array().items(ordersValidationSchema).optional()
});