const User = require("../schema/userSchema");
const express = require("express");
const TokenVerfiy = require("../middleware/verfiyToken");
const Conversation = require("../schema/conversationSchema");

const router = express.Router();

router.get("/chat-item", TokenVerfiy, async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});
router.get("/conversation/:userId", TokenVerfiy, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const {message} = await Conversation.findOne({
      $or: [
        { senderId: req.user.id, receiverId: userId },
        { senderId: userId, receiverId: req.user.id },
      ],
      
    });
    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
});

router.post("/new-message/:receiverId", TokenVerfiy, async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    if (req.body.message === "") {
      return;
    }
    const isConversation = await Conversation.findOne({
      $or: [
        { senderId: req.user.id, receiverId: receiverId },
        { senderId: receiverId, receiverId: req.user.id },
      ],
    });
    if (isConversation) {
      isConversation.message.push({
        senderId:req.user.id,
        receiverId,
        text:req.body.message
      })
      await isConversation.save()
      console.log(isConversation);
      // await Conversation.updateMany({
      //   $or: [
      //     { senderId: req.user.id, receiverId: receiverId },
      //     { senderId: receiverId, receiverId: req.user.id },
      //     {message: [
      //       {
      //         senderId: req.user.id,
      //         receiverId,
      //         text: req.body.message,
      //       },
      //     ]}
      //   ],
      // }).save();
    } else {
      await Conversation({
        senderId: req.user.id,
        receiverId: receiverId,
        message: [
          {
            senderId: req.user.id,
            receiverId,
            text: req.body.message,
          },
        ],
      }).save();
    }

    res.status(201).json({ message: "message sent successfull" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
