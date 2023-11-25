import Joi from 'joi'

const fullNameValidationSchema = Joi.object({
    firstName: Joi.string().required().messages({'any.only':'First Name is required'}),
    lastName: Joi.string().required().messages({'any.only':'Last Name is required'}),
});

const addressValidationSchema = Joi.object({
    street: Joi.string().required().messages({'any.only':'Street is required'}),
    city: Joi.string().required().messages({'any.only':'City is required'}),
    country: Joi.string().required().messages({'any.only':'Country is required'})
});

const ordersValidationSchema = Joi.object({
    productName: Joi.string().required().messages({'any.only':'Product Name is required'}),
    price: Joi.number().required().positive().messages({'any.only':'Price is required'}),
    quantity: Joi.number().required().positive().messages({'any.only':'Quantity is required'})
});

export const userValidationSchema = Joi.object({
    userId: Joi.number().required().messages({'any.only':'User Id is required'}),
    username: Joi.string().required().messages({'any.only':'Username is required'}),
    password: Joi.string().required().messages({'any.only':'Password is required'}),
    fullName: fullNameValidationSchema.required().messages({'any.only':'Full Name is required'}),
    age:Joi.number().required().messages({'any.only':'Age is required'}),
    email: Joi.string().required().messages({'any.only':'Email is required'}),
    isActive: Joi.boolean().required().messages({'any.only':'Active/Inactive is required'}),
    hobbies: Joi.array().items(Joi.string()).required().messages({'any.only':'Hobby is required'}),
    address: addressValidationSchema.required().messages({'any.only':'Address is required'}),
    orders: Joi.array().items(ordersValidationSchema.required()).optional()
});

export default userValidationSchema;