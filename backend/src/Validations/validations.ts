import express from 'express';
import Joi from 'joi';
import '../controllers/controllers';
// Define the validation schema for Test attributes
const testValidationSchema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.base': '"firstName" should be a type of "text"',
            'string.empty': '"firstName" cannot be an empty field',
            'string.min': '"firstName" should have a minimum length of {#limit}',
            'string.max': '"firstName" should have a maximum length of {#limit}',
            'any.required': '"firstName" is a required field',
        }),

    lastName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.base': '"lastName" should be a type of "text"',
            'string.empty': '"lastName" cannot be an empty field',
            'string.min': '"lastName" should have a minimum length of {#limit}',
            'string.max': '"lastName" should have a maximum length of {#limit}',
            'any.required': '"lastName" is a required field',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': '"email" should be a type of "text"',
            'string.email': '"email" must be a valid email',
            'string.empty': '"email" cannot be an empty field',
            'any.required': '"email" is a required field',
        }),

    password: Joi.string()
        .min(8)
        .max(100)
        .required()
        .messages({
            'string.base': '"password" should be a type of "text"',
            'string.empty': '"password" cannot be an empty field',
            'string.min': '"password" should have a minimum length of {#limit}',
            'string.max': '"password" should have a maximum length of {#limit}',
            'any.required': '"password" is a required field',
        }),
});

// Export the schema for use in other parts of your application
export default testValidationSchema;
