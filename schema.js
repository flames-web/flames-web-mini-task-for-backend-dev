const joi = require('joi');

module.exports.userSchema = joi.object({
    username:joi.string().min(4).max(30).required(),
    email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:joi.string().min(8).max(125).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$')).required(),
    token:joi.string()
})

// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number