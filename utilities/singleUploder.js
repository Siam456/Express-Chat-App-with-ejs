const multer = require("multer");
const path = require('path');
const createError = require('http-errors');

function uploader(
    subfolder_path,
    allowed_file_type,
    max_file_size,
    error_msg
){
    const UPLOAD_PATH = `${__dirname}/../public/upload/${subfolder_path}`
    //const UPLOAD_PATH = `${__dirname}/upload/${subfolder_path}`

    //storage

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOAD_PATH);
        },
        filename: (req, file, cb) => {
            const fileext = path.extname(file.originalname);
            const filename= file.originalname
                            .replace(fileext, "")
                            .toLocaleLowerCase()
                            .split(" ")
                            .join("-") + "-" + Date.now();
            cb(null, filename + fileext);
        }
    });

    //final object
    var upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size,
        },
        fileFilter: (req, file, cb) => {
            if(allowed_file_type.includes(file.mimetype)){
                cb(null, true);
            } else{
                cb(createError(error.msg));
            }
        }
    })
    return upload;
}

module.exports = uploader;