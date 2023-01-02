const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema({
  senderId: String,
  receiverId: String,
  message:[{
    senderId:String,
    receiverId:String,
    text:String,
    _id:false
  }]
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
