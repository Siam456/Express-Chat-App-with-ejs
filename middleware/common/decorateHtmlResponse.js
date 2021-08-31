const Moment = require('moment');

function decorateHtmlResponse(page_title) {
    return function(req, res, next){
        res.locals.html= true;
        res.locals.title = `${page_title} -${process.env.APP_NAME}`;
        res.locals.errors = {},
        res.locals.moment = Moment,
        res.locals.data = {},
        res.locals.loogedInUser = {},
        next();
    }
}

module.exports = decorateHtmlResponse;