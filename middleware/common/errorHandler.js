const createError = require('http-errors');

//404 not found
function notFoundHandler(req, res, next){
    res.locals.title = "404 not fount";
    res.render('error');
}

function errorHandler(err, req, res, next){
    //res.locals.title = "THIS IS ERROR PAGE"
    res.locals.error = 
        process.env.NODE_ENV === "development" ? err : {message: err.message}

    res.status(err.status || 500);

    if(res.locals.html){
        //html response
        res.render('error', {
            title: "ERROR PAGE"
        })
    } else{
        //json response
        res.json(res.locals.error);
    }

    
}

module.exports ={
    notFoundHandler,
    errorHandler
}