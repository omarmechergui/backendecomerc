const express = require("express");
const { singup, singin, valid_email, updateuser } = require("../controler/user");
const { singupvalidation, singinvalidation, validation } = require("../middleware/validation");
const isauth = require("../middleware/isauth");
const {payment, successpayment, cancelpayment} = require("../controler/payment");
const sendsms = require("../controler/sms");
const userroter  = express.Router();
userroter.post("/register/:token",singup);
userroter.post("/email",singupvalidation,validation,valid_email)
userroter.post("/login",singinvalidation,validation,singin);
userroter.post("/payment",payment)
userroter.put('/update/:id',isauth,updateuser)
userroter.post("/sms",sendsms)
userroter.get("/getcurrent",isauth,async(req,res)=>{
    const user = req.user
    res.status(200).send({msg:"connecting user",user});
})

module.exports = userroter;