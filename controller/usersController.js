//get Users page
const bcrypt = require('bcrypt');
const User = require('../models/people');
const { unlink } = require('fs');
const path = require('path');
const Conversation = require('../models/Conversation');


async function getUsers(req, res, next) {
    const user = await User.find({});
    try{
        //console.log(user);
        res.render('users', {
            users: user,
        });
    } catch(err){
        next(err);
    }
    
}

async function addUser(req, res, next) {
    let newUser;
    const salt = await bcrypt.genSalt(10);
    const hashpass= await bcrypt.hash(req.body.password, salt);
    //console.log(req.body);

    if(req.files && req.files.length > 0){
        newUser = new User({
            ...req.body,
            avater: req.files[0].filename,
            password: hashpass,
        })
    } else{
        newUser = new User({
            ...req.body,
            password: hashpass,
        })
    }

    try{
        const ress = await newUser.save();
        res.status(200).json({
            message: "User was added successfully",
        })
    } catch(err){
        res.status(500).json({
            errors: {
                msg: err.message
            }
        })
    }
}


async function removeUsers(req, res, next) {
    //remove user
    const user = await User.findByIdAndDelete({
        _id: req.params.id
    });

    
    


    try{
        //remove image using unlink

        if(user.avater){
            unlink(
                path.join(__dirname, `/../public/upload/avater/${user.avater}`,
                (err) => {
                    if(err) console.log(err);
                })
            )
        }
        //console.log(user);
        res.status(200).json({
            message: "User was delete successfully",
        });
    } catch(err){
        res.status(500).json({
            error: {
                common: {
                    msg: "Could not delete the user",
                }
            }
        });
    }
    
}

module.exports = {
    getUsers,
    addUser,
    removeUsers
};