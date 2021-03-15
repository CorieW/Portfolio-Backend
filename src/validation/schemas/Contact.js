const Joi = require('joi')

const schema = Joi.object({
    email: Joi.string()
        .required()
        .email()
        .messages({
            'string.base': `Email should be a string.`,
            'string.empty': `You must enter your email address.`,
            'string.email': `You must enter a valid email address.`,
            'any.required': `You must enter your email address.`
        }),

    subject: Joi.string()
        .required()
        .max(128)
        .messages({
            'string.base': `Subject should be a string.`,
            'string.empty': `You must enter a subject.`,
            'string.max': `Subject should have a maximum of {#limit} characters.`,
            'any.required': `You must enter a subject.`
        }),

    message: Joi.string()
        .required()
        .messages({
            'string.base': `Message should be a string.`,
            'string.empty': `You must enter a message.`,
            'any.required': `You must enter a message.`
        })
})

module.exports = schema