const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');


//internal export
const userSchema = require('./schema/userSchema');
const {notFoundHandler, errorHandler} = require('./middleware/common/errorHandler')
const loginRouter = require('./router/loginRouter');
const usersRouter = require('./router/usersRouter');
const inboxRouter = require('./router/inboxRouter');

const app = express();
dotenv.config();

//database connection
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING,  
{
     useNewUrlParser: true,
     useUnifiedTopology: true
})
.then(()=> console.log("successfully connected"))
.catch((err) => console.log(err));

//db model
const User = mongoose.model('User', userSchema);

//request process
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//set view engine
app.set('view engine', 'ejs');

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//cookie parser
app.use(cookieParser(process.env.COOKIE_PARSER))

//routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);



app.get('/about', (req, res) => {
     res.render('about');
})

//testing

const checkLogin = require('./middleware/common/checkLogin');
const {addConversation , deleteConversation, addmassage} = require('./controller/inboxController');
const checklogin = require('./middleware/common/checkLogin');
const Message = require('./models/Message');
const decorateHtmlResponse = require('./middleware/common/decorateHtmlResponse');


app.post('/createconversation/:id', checkLogin , addConversation);

app.post('/conversation/siam/delete', deleteConversation);

//create msg

app.post('/create/msg' , checklogin, addmassage);

app.get('/get/:msg' , async (req, res) => {
     try{
          const ress = await Message.find({conversation_id: req.params.msg}).sort("createdAt");
          res.json({
               msg: ress
          })
     } catch(err){
          res.json({
               err
          })
     }
})

app.get('/profile', decorateHtmlResponse("Profile"), checklogin,  (req, res) => {
     res.render('profile');
})


//404 not found
app.use(notFoundHandler);

//common error handeler
app.use(errorHandler);


app.listen(process.env.PORT, () => {
    console.log(`starting server ${process.env.PORT} successfully`);
});