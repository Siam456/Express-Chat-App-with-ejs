const User = require('../models/people');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

//get inbox page
async function getInbox(req, res, next) {
    try{
        //console.log(req.user)
        const user = await User.find({});
        const conversation = await Conversation.find({
            $or: [
                { "creator.id": req.user.userid },
                { "participant.id": req.user.userid },
              ],
        });
        
        res.render('inbox', {
            users: user,
            conversations : conversation,
        })
    } catch(err){
        next(err);
    }
}

async function addConversation(req, res, next) {
    try {


      const newConversation = new Conversation({
        creator: {
          id: req.user.userid,
          name: req.user.name,
          avatar: req.user.avatar || null,
        },
        participant: {
          name: req.body.participante_name,
          id: req.body.participate_id,
          avatar: req.body.participate_avatar || null,
        },
      });
  
      const result = await newConversation.save();
      res.status(200).json({
        message: "Conversation was added successfully!",
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  }

  async function deleteConversation (req, res)  {
    console.log(req.body.id);
    const conversation = await Conversation.findByIdAndDelete({
      _id: req.body.id
  });
    try{
         res.json({
           ress: req.body.id
         })

    } catch(err){
      res.json({
        errss: req.body.id
      })
    }
    
}

async function addmassage(req, res) {

  try{
    const message = new Message({
      text: req.body.text,
      sender: {
        id: req.user.userid,
        name: req.user.name,
        avatar: req.user.avatar || null,
      },
      receiver: {
        id: req.body.reciver_id,
        name: req.body.reciver_name,
        avatar: req.body.reciver_avater || null,
      },
      conversation_id: req.body.conversation_id,
  
    });

    const ress = await message.save();
    res.status(200).json({
      ress: ress,
    })
  } catch(err){
    res.status(500).json({
      errors: err,
    })
  }
     
  console.log('sender:' + req.user.userid);
  
}

module.exports = {
    getInbox,
    addConversation,
    deleteConversation,
    addmassage
};