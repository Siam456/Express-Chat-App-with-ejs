//external import
const express = require('express');

//internal error
const {getUsers, addUser, removeUsers} = require('../controller/usersController');
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');
const avaterUpload = require('../middleware/user/avaterUpload');
const { addUservalidator, addUserValidationHandler } = require('../middleware/user/userValidator');
const checklogin = require('../middleware/common/checkLogin');

const router = express.Router();

router.get('/', decorateHtmlResponse("USER"), checklogin, getUsers);

//add user
router.post('/', avaterUpload, addUservalidator, addUserValidationHandler, addUser);

//delete user
router.delete('/:id', removeUsers);

module.exports = router;