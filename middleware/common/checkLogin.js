const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const checklogin = (req, res, next) => {

    const cookies =
        Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    
    if(cookies){
        try{
            token = cookies[process.env.COOKIE_NAME];
            const decoded = jwt.verify(token, process.env.JWT_SECRATE);
            req.user = decoded; 
            
            if(res.locals.html){
                res.locals.loogedInUser = decoded;
            }
            next();
        } catch(err) {
            if(res.locals.html){
                res.redirect("/");
            } else{
                res.status(500).json({
                    errors: {
                        common: {
                            msg: "Authentication failed!",
                        }
                    }
                })
            }
        }
    } else{
        if(res.locals.html){
            res.redirect("/");
        } else{
            res.status(500).json({
                error: "Authentication failed!",
            })
        }
    }
}

module.exports = checklogin;