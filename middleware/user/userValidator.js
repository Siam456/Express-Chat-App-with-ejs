const { check, validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const user = require('../../models/people');
const path = require('path');
const {unlink} = require('fs');

const addUservalidator = [
    check("name").
        isLength({ min: 1 })
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore: "-"})
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),
    check("email")
            .isEmail()
            .withMessage("Invalid email address")
            .trim()
            .custom(async (value) => {
                try{
                    const usera = await user.findOne({email: value});
                    if(usera) {
                        throw createHttpError("Email is already is Use;");
                    }
                } catch(err){
                    throw createHttpError(err.message);
                }
            }),
        check("phone")
            .isMobilePhone("bn-BD", {
                strictMode : true,
            })
            .withMessage("Must be a valid Bangladeshi Phone Number")
            .custom(async (value) => {
                try{
                    const usera = await user.findOne({phone: value});
                    if(usera) {
                        throw createHttpError("Phone Number is already is Use;");
                    }
                } catch(err){
                    throw createHttpError(err.message);
                }
            }),    
];

const addUserValidationHandler = function(req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if(Object.keys(mappedErrors).length === 0) {
        next();
    } else{
        //remove uploaded files
        if(req.files.length > 0) {
            const {filename } = req.files[0];
            unlink(
                path.join(__dirname, `/../public/uploads/avaters/${filename}`),
                (err) => {
                    if(err) console.log(err);
                }
            )
        }

        res.status(500).json({
            errors: mappedErrors,
        })
    }
}

module.exports = {
    addUservalidator,
    addUserValidationHandler
}