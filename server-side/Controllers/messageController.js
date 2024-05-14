

// const asyncHandler = require("express-async-handler");
// const message = require("../models/messageModel");
// const user = require("../models/userModel");
// const chat = require("../models/chatModel");

// const allMessages = asyncHandler(async (req, res) => {
//   try {
//     const messages = await message
//       .find({ chat: req.params.chatId })
//       .populate("sender", "name email")
//       .populate("reciever")
//       .populate("chat");

//     res.json(messages);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// const sendMessage = asyncHandler(async (req, res) => {
//   const { content, chatId } = req.body;
//   if (!content || !chatId) {
//     return res.sendStatus(400);
//   }

//   var newMessage = {
//     sender: req.user._id,
//     content: content,
//     chat: chatId,
//   };

//   try {
//     var Message = await message.create(newMessage);

//     Message = await message.populate(Message, { path: "sender", select: "name" });
//     Message = await message.populate(Message, { path: "chat" });
//     Message = await message.populate(Message, { path: "reciever" });
//     Message = await user.populate(Message, {
//       path: "chat.users",
//       select: "name email",
//     });

//     await chat.findByIdAndUpdate(req.body.chatId, { latestMessage: Message });
//     res.json(Message);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// module.exports = { allMessages, sendMessage };
const asyncHandler = require("express-async-handler");
const message = require("../models/messageModel");
const user = require("../models/userModel");
const chat = require("../models/chatModel");

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await message
      .find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("reciever")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// const sendMessage = asyncHandler(async (req, res) => {
//   const { content, chatId } = req.body;
//   if (!content || !chatId) {
//     return res.sendStatus(400);
//   }

//   try {
//     const newMessage = await message.create({
//       sender: req.user._id,
//       content: content,
//       chat: chatId,
//     });

//     const populatedMessage = await newMessage
//       .populate("sender", "name")
//       .populate("chat")
//       .populate("reciever")
//       .execPopulate();

//     await chat.findByIdAndUpdate(chatId, { latestMessage: populatedMessage });
//     res.json(populatedMessage);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });


const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return res.sendStatus(400);
  }

  try {
    const newMessage = await message.create({
      sender: req.user._id,
      content: content,
      chat: chatId,
    });

    const populatedMessage = await newMessage
      .populate("sender", "name")
      .populate("chat")
      .populate("reciever")
      .execPopulate();

    await chat.findByIdAndUpdate(chatId, { latestMessage: populatedMessage });
    res.json(populatedMessage);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { allMessages, sendMessage };