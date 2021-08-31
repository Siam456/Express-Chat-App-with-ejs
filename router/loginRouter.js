//external import
const express = require('express');
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');

const {getLogin, logintoken , logout, redirectLogedIN} = require('../controller/loginController')
const {loginValidation, checkLoginValidation} = require('../middleware/login/loginValidation')

const router = express.Router();

router.get('/', decorateHtmlResponse("LOGIN"), redirectLogedIN, getLogin);

router.post('/' , decorateHtmlResponse("LOGIN"), loginValidation, checkLoginValidation, logintoken);

router.delete('/', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    console.log('hobar kotha')
    res.end();
});

router.get('/createaccount', decorateHtmlResponse("REG"), (req, res) => {
    res.render('loginpage-add-user');
});

module.exports = router;