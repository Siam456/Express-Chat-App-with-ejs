//external import
const express = require('express');
const {getInbox} = require('../controller/inboxController')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');
const checkLogin = require('../middleware/common/checkLogin');

const router = express.Router();

router.get('/', decorateHtmlResponse("INBOX"), checkLogin, getInbox);

module.exports = router;