// const express = require("express");

// const {accessChat,fetchChat,fetchGroups,createGroupChat,addSelfToGroup,groupExit} = require("../controllers/chatcontroller.js");

// const {protect} = require("../middleware/authMiddleWare");

// const router = express.Router();

// router.post("/accesschat",protect, accessChat);
// router.get("/fetchchats",protect, fetchChat);
// router.get("/fetchGroups",protect,fetchGroups);
// router.post("/createGroup",protect,createGroupChat);
// router.put("/addselftogroup",protect,addSelfToGroup);
// router.put("/groupexit",protect,groupExit);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  accessChat,
  fetchChat,
  fetchGroups,
  createGroupChat,
  addSelfToGroup,
  groupExit
} = require("../controllers/chatcontroller.js");

const { protect } = require("../middleware/authMiddleWare");


router.post("/acceschat",(req,res)=>{
  protect;
  accessChat(req,res);
});

router.get("/fetchchats",(req,res)=>{
  protect;
  fetchChat(req,res);
});

router.get("/fetchgroups",(req,res)=>{
  protect;
  fetchGroups(req,res);
});

router.post("/creategroup",(req,res)=>{
  protect;
  createGroupChat(req,res);
});

router.put("/addselftogroup",(req,res)=>{
  protect;
  addSelfToGroup(req,res);
});

router.put("/groupexit",(req,res)=>{
  protect;
  groupExit(req,res);
});
// router.post("/accesschat", protect, accessChat);
// router.get("/fetchchats", protect, fetchChat);
// router.get("/fetchGroups", protect, fetchGroups);
// router.post("/createGroup", protect, createGroupChat);
// router.put("/addselftogroup", protect, addSelfToGroup);
// router.put("/groupexit", protect, groupExit);

module.exports = router;
