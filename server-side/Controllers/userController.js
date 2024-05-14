

const express = require("express");
const userModel = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");

// Middleware for setting the content type as JSON
const jsonMiddleware = express.json();

const loginController = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await userModel.findOne({ name });

  if (user && (await user.matchPassword(password))) {

    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    }
    res.status(200).json(response);
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check for all fields
  if (!name || !email || !password) {
    res.status(404).json({ message: "All necessary input fields have not been filled" });
    return;
  }

  // Check if email already exists
  const emailExist = await userModel.findOne({ email });
  if (emailExist) {
    res.status(405).json({ message: "User already exists with this email" });
    return;
  }

  // Check if username already exists
  const userNameExist = await userModel.findOne({ name });
  if (userNameExist) {
    res.status(406).json({ message: "Username already exists" });
    return;
  }

  // Create a new user
  const user = await userModel.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(400).json({ message: "Registration failed" });
  }
});


const fetchAllUsersController = expressAsyncHandler(async(req,res)=>{
  const keyword = req.query.search
  ?{
    $or:[
      {name:{$regex: req.query.search,$options:"i"}},
      {email:{$regex: req.query.search,$options:"i"}},
    ],
  }:{};

  const users = await userModel.find(keyword).find({_id:{$ne:req.user._id},});
  res.send(users);
});

module.exports = { loginController, registerController,fetchAllUsersController };

