const {body ,validationResult} = require("express-validator");
const singupvalidation = [
    body("email","this email is not valid").isEmail(),
    body("password","this password is not steang").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
]

const singinvalidation =[
    body("email","this email is not valid").isEmail()
]

const validation =(req,res,next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            next()
        }
        else{
            res.status(400).send({msg:"invalid password or email",errors:errors.array()})
        }
    } catch (error) {
        res.status(500).send({msg:"server error",error})
        
    }
}



module.exports = {singinvalidation, validation, singupvalidation,}