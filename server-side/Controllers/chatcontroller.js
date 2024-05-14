const asyncHandler = require("express-async-handler");
const chat = require("../models/chatModel");
const user = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId param is not sent with request");
    return res.status(400).send("userId param is required");
  }

  try {
    let isChat = await chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user._id, userId] } // Corrected users query
    })
      .populate("users", "-password")
      .populate("latestMessage.sender");

    if (!isChat) {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId] // Corrected users array
      };

      const createdChat = await chat.create(chatData);
      isChat = await chat.findById(createdChat._id)
        .populate("users", "-password");
    }

    res.status(200).json(isChat);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  try {
    const results = await chat.find({ users: req.user._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const fetchGroups = asyncHandler(async (req, res) => {
  try {
    const allGroups = await chat.find({ isGroupChat: true });
    res.status(200).json(allGroups);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  const { name, users } = req.body;

  if (!name || !users) {
    return res.status(400).json({ message: "Name and users are required" });
  }

  const parsedUsers = JSON.parse(users);
  parsedUsers.push(req.user._id);

  try {
    const groupChat = await chat.create({
      chatName: name,
      users: parsedUsers,
      isGroupChat: true,
      groupAdmin: req.user._id
    });

    const fullGroupChat = await chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const groupExit = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const removed = await chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    ).populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      res.status(404).send("Chat not found");
    } else {
      res.status(200).json(removed);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const addSelfToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const added = await chat.findByIdAndUpdate(chatId,
      { $push: { users: userId } },
      { new: true }
    ).populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      res.status(404).send("Chat not found");
    } else {
      res.status(200).json(added);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { accessChat, fetchChat, fetchGroups, createGroupChat, addSelfToGroup, groupExit };
