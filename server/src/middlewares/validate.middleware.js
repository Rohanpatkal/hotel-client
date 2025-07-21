const { validationResult } = require('express-validator');

exports.validate = (req , res , next) => {
    const errors = validationResult(req); //get validation errors
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array().map(err => err.msg) //return only messages
        })
    }
    next(); //if no errors, continue
}