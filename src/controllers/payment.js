const request = require('request');
const _ = require('lodash');
const { response } = require('express');
const {initializePayment, verifyPayment,allTransactions} = require('../../config/payments')(request);


module.exports.payment = async (req, res) => {
    try {
        const form = _.pick(req.body,['amount','email','full_name']);
        form.metadata = {
            full_name : form.full_name
        }
        form.amount = 5000;
        form.email = 'customer@email.com'
        initializePayment(form, (error, body)=>{
            if(error){
             console.log(error)
           }
          return res.status(200).send({message:JSON.parse(body)})
        })
    } catch(error) {
        return res.status(error?.status || 500)
                  .send({status:false,message:error?.message || error})
    }
}

module.exports.verifyPayment = async (req,res) => {
    try {
        const {ref} = req.params;
        verifyPayment(ref,(error,body) => {
            if(error){
              return  res.status(error?.status || 400).send({status:false,message:error?.message || error})
            }
            return res.status(200).send({message:JSON.parse(body)})
        })
    } catch (error) {
        return res.status(error?.status || 500)
                  .send({status:false,message:error?.message || error})
    }
}

module.exports.allTransactions = async (req,res) => {
    try {
        const {page} = req.query;
        allTransactions(page,(error,body) => {
            if(error){
               return res.status(error?.status || 400).send({status:false,message:error?.message || error})
            }
            return res.status(200).send({message:JSON.parse(body)})
        })
    } catch (error) {
        return res.status(error?.status || 500)
                  .send({status:false,message:error?.message || error})
    }
}