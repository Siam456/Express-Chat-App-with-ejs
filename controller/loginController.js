const User = require('../models/people');
const Conversation = require('../models/Conversation');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

//get login page
function getLogin(req, res, next) {
    res.render('index');
}

async function logintoken (req, res, next) {
    try{
        const user = await User.findOne({
            $or: [{ email: req.body.username} , {phone: req.body.username}],
        });
        const userall = await User.find({});
        if(user && user._id) {
            const ValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(ValidPassword){
                //token generate
                const userObj = {
                    userid: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    avatar: user.avatar || null,
                    role: user.role || "user",
                };
                const token = jwt.sign(userObj, process.env.JWT_SECRATE ,{
                    expiresIn: process.env.JWT_EXPIRE
                });
                //set cookie
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRE,
                    httpOnly: true,
                    signed: true,
                });

                //console.log(token);

              

                res.locals.loogedInUser = userObj;
                const conversation = await Conversation.find({
                    $or: [
                        { "creator.id": userObj.userid },
                        { "participant.id": userObj.userid },
                      ],
                });
                 
                res.render('profile')
                

            } else{
                throw createError('Login failed! please try again');
            }
        } else{
            throw createError('Login failed! please try again');
        }
    } catch(err){
        res.render('index', {
            errors: {
                common: {
                    msg: err.message,
                }
            }
        })
    }
}
 
function logout (req, res) {
    res.clearCookie(process.env.COOKIE_NAME);
}

const redirectLogedIN = (req, res, next) => {
    const cookies =
        Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null ;
    if(!cookies){
        next();
    } else{
        res.redirect('/inbox');
    }
}
module.exports = {
    getLogin,
    logintoken,
    logout,
    redirectLogedIN
};