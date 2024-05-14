const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose"); // Removed default import
const cors = require("cors");

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Server connected to db"); // Changed log message
  } catch (error) {
    console.log("Server not connected to db"); // Changed log message
  }
};

connectDb();

app.get("/", (req, res) => {
  res.send("API is running good"); // Changed response message
});

const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const socketIo = require("socket.io");

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("Server connection established.."); // Corrected log message
});

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
});

io.on("connection", (socket) => { // Changed parameter name to lowercase
  socket.on("setup", (user) => {
    socket.join(user.data._id); // Changed Socket to socket
    socket.emit("connected");
  });

  socket.on("join chat", (room) => { // Changed Socket to socket
    socket.join(room);
  });

  socket.on("new message", (newMessageStatus) => { // Changed Socket to socket
    var chat = newMessageStatus.chat;
    if (!chat.users) {
      return console.log("chat.users not defined");
    }

    chat.users.forEach((user) => {
      if (user._id == newMessageStatus.sender._id) return;

      io.to(user._id).emit("message received", newMessageStatus); // Changed Socket.bind to io.to
    });
  });
});
