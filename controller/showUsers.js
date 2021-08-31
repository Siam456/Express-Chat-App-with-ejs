const User = require('../models/people');

async function showUsers (req, res, next) {
    try{
        const user = await User.find({});
        res.render('test', {
            users: user,
            title: 'test page'
        })
    } catch(err){
        next(err);
    }
}

module.exports = showUsers;