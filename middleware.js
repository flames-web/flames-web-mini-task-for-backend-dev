const jwt = require("jsonwebtoken");
const {userSchema} = require('./schema');
const secret = 'olalekan';


module.exports.verifyToken = (req,res,next) => {
    const token = req.headers['x-access-token'];
        if(!token){
            res.status(401).send({auth:false,message:'No token Provided'});
        }
    const decoded = jwt.verify(token,secret)
    req.userId = decoded.id;
    next();
}

module.exports.validateUser = (req,res,next) => {
    const {error} = userSchema.validate(req.body);
    if(error) {
       return res.status(error?.status || 400)
                 .send({message:error?.message || error}) 
    }
    next();
}