import Joi from 'joi';


const userValidationSchema = Joi.object({
    firstName: Joi.string()
        .min(1)
        .max(100)
        .required(),

    lastName: Joi.string()
        .max(100)
        .optional(),

    email: Joi.string()
        .email()
        .required(),

    phone: Joi.string()
        .pattern(/^\d+$/, { name: 'digits' })
        .required(),

    gender: Joi.string()
        .valid('male', 'female', 'other')
        .required(),

    userType: Joi.string()
        .valid('jobSeeker', 'agency')
        .required(),

    hobbies: Joi.array()
        .items(Joi.string())
        .optional(),

    profileImage: Joi.string()
        .uri()
        .optional(),

    resume: Joi.string()
        .uri()
        .optional(),

    selectedAgency: Joi.string()
        .optional(),
});

export default userValidationSchema;
