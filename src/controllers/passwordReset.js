const crypto  = require('crypto');
const bcrypt = require('bcrypt');
const { sendMail } = require('../services/mail');
const {generateOtp} = require('../services/otp');
const {generateToken} = require('../services/jwt')
const User = require('../models/users');
const Token = require('../models/token');

module.exports.postReset = async (req,res) => {
    try {
    const {email} = req.body;
    const user = await User.findOne({email})
    if(!user) {
        return res.status(400).send({status:'Failed',messsage:'User with this given email doesnt exist'})
    }
    let token = await Token.findOne({userId:user._id});
    if(!token) {
       token = new Token({
         userId:user._id,
         token:crypto.randomBytes(32).toString('hex'),
       })
       await token.save();
    }
    try{
      await sendMail({
        to:email,
        subject:'Password Reset',
        text:`${token.token}`,
        html:`${token.token}`
    })
    }catch(error){
     return res.status(error?.status || 500).send({message:error?.message || 500})
    }
    return res.status(200).send({status:'Ok',message:'Token for password reset sucessfully sent',data:token})
    } catch (error) {
        res.status(error?.status || 500)
           .send({message:error?.message || error})
        
    }
}

module.exports.postToken = async (req,res) => {
   try{
    const {id,token} = req.params;
    const {password} = req.body;
    const user = await User.findById(id);
    if(!user){
       return res.status(400).send({message:'User does not exist'});
    }
    const foundToken = await Token.findOne({userId:user._id});
    if(foundToken.token !== token){
        return res.status(401).send({status:false,message:'Invalid Token'});
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const updatedUser = await User.findByIdAndUpdate(id,{password:hashedPassword});
    await updatedUser.save();
    const generatedToken = generateToken(updatedUser);
    return res.status(200).send({status:'Ok',message:'Password sucessfully changed'})
   } catch(error) {
      res.status(error?.status || 500)
         .send({message:error?.message || error})
   }
}