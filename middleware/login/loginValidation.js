const {check, validationResult} = require('express-validator');

const loginValidation = [
    check('username')
        .isLength({
            min: 1,
        })
        .withMessage("Mobile numer or email is required"),
    check('password')
        .isLength({
            min: 1,
        })
        .withMessage("Enter a Password"),
]

const checkLoginValidation = function (req, res, next) {
    const errors = validationResult(req);
    const maperrors = errors.mapped();

    if(Object.keys(maperrors).length === 0) {
        next();
    } else {
        res.render('index' , {
            errors: maperrors,
            data: {
                username: req.body.username,
            },
        });
    }
}

module.exports = {
    loginValidation,
    checkLoginValidation
}