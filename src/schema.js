const joi = require('joi');

module.exports.userSchema = joi.object({
    username:joi.string().min(4).max(30),
    email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:joi.string().min(8).max(125).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$'))
})

module.exports.itemSchema  = joi.object({
    name:joi.string().min(4).required(),
    description:joi.string().required(),
    price:joi.number().min(1).required(),
    unit:joi.number().min(1).required(),
})