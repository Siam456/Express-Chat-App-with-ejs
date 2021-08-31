const uploader = require('../../utilities/singleUploder')

function avaterUpload(req, res, next){
    const upload = uploader(
        "avater",
        ["image/jpeg", "image/jpg", "image/png"],
        10000000,
        "Only .jpg, .ppeg, .png formate allowed"
    );
    upload.any()(req, res, (err) => {
        if(err) {
            res.status(500).json({
                errors: {
                    avater: {
                        msg: err.message,
                    }
                }
            })
        } else{
            next();
        }
    });

}

module.exports = avaterUpload;