// const express = require("express");

// const {allMessages,sendMessage} = require("../controllers/messageController");


// const {protect} = require("../middleware/authMiddleWare");

// const router = express.Router();

// router.get("/:chatId",protect,allMessages);
// routerpost("/",protect,sendMessage);

// module.exports = router;
const express = require("express");

const { allMessages, sendMessage } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleWare");

const router = express.Router();


router.get("/:chatId",(req,res)=>{
  protect;
  allMessages(req,res);
});

router.post("/",(req,res)=>{
  protect;
  sendMessage(req,res);
});


// router.get("/:chatId", protect, allMessages);
// router.post("/", protect, sendMessage); // Added a space between router and post

module.exports = router;
