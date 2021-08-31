 const express = require('express');
// const multer = require('multer');
// const path = require('path');
const mongoose = require('mongoose');
 const User = require('./models/people');

 const app = express();

 app.set('view engine', 'ejs');

 app.use(express.json());
 app.use(express.urlencoded({extended : true}));

 mongoose.createConnection("mongodb://localhost:27017/chatapp", {
     useNewUrlParser: true,
     useUnifiedTopology: true
 })
 .then(() => console.log("ok"))
 .catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.render('inbox')
});



 app.listen(3000, () =>{});

// //////////////////////////


