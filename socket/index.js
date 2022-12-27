require("dotenv").config();

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
let userArray = [];

const addUser = (userId, socketId) => {
  !userArray.some((user) => user.userId == userId) &&
    userArray.push({ userId, socketId });
};

const removeUser = (socketId) => {
  userArray = userArray.filter((user) => user.socketId !== socketId);
};
const userExist = (userId) => {
  return userArray.filter((user) => user.userId == userId)[0];
};
io.on("connection", (socket) => {
  socket.on("add-user", ({ userId }) => {
    addUser(userId, socket.id);
    io.emit("all-active-user", userArray);
  });
  // message sent to user
  socket.on("send-message", (data) => {
    const isExist = userExist(data.receiverId);
    if (isExist) {
      io.to(isExist.socketId).emit("send-message-to-receiver", data);
    }
  });
  // message typing event
  socket.on("typing-message", (data) => {
    const isExist = userExist(data.receiverId);
    if(isExist) {
      io.to(isExist.socketId).emit('typing-message',{senderId:data.senderId,typing:data.typing})
    }
    
  });
  socket.on("call-send", (data) => {
    const { callType, connectedUserId, myId } = data;
    const isExist = userExist(connectedUserId);
    if (isExist) {
      io.to(isExist.socketId).emit("call-receive", {
        connectedUserId: myId,
        connectedUserSocketId: socket.id,
        callType,
      });
    }
  });
  socket.on("accept-call-by-receiver", (data) => {
    const { connectedUserId } = data;
    const isExist = userExist(connectedUserId);
    if (isExist) {
      io.to(isExist.socketId).emit("accept-call-by-receiver", {
        connectedUserSocketId: socket.id,
      });
    }
  });
  // here is handle webrtcSignaling

  socket.on("webRTC-signaling", (data) => {
    io.to(data.connectedUserSocketId).emit("webRTC-signaling", {
      ...data,
      connectedUserSocketId: socket.id,
    });
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("all-active-user", userArray);
  });
});

const PORT = process.env.PORT || 4001;

httpServer.listen(PORT, () => {
  console.log(`server running successfull ${4001} `);
});
