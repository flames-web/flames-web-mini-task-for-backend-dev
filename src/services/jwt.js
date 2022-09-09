const jwt = require('jsonwebtoken');
const secret = 'olalekan'

module.exports.generateToken = (user) => {
    const token = jwt.sign({
        id:user._id,
    },
        secret,{
            expiresIn:60*60*60
        }
   )
   return token;
}
