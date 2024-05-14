// const express = require("express");
// const Router = express.Router();
// const {loginController,registerController,fetchAllUsersController} = require("../controllers/userController");
// const protect = require("../middleware/authMiddleWare");
// Router.post('/login',loginController);
// Router.post('/register',registerController);
// Router.get("/fetchUsers",protect,fetchAllUsersController);


// module.exports = Router;


const express = require("express");
const Router = express.Router();
const { loginController, registerController, fetchAllUsersController } = require("../controllers/userController");
const protect = require("../middleware/authMiddleWare");

Router.post('/login',loginController);
Router.post('/register',registerController);
Router.get("/fetchUsers", 
  protect,
  fetchAllUsersController);

module.exports = Router;
