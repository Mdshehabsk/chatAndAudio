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
  socket.on("add-user", (userId) => {
    addUser(userId, socket.id);
    // socket.on("connected-user", (data) => {
    //   const { userType, callerId, receiverId } = data;
    //   if (userArray.length >= 2) {
    //     switch (data.userType) {
    //       case "caller":
    //         const isExistReciver = userExist(data.receiverId);
    //         if (isExistReciver)
    //           socket.emit("connected-user", {
    //             socketId: isExistReciver.socketId,
    //           });
    //         break;
    //       case "receiver":
    //         const isExistCaller = userExist(data.callerId);
    //         if (isExistCaller)
    //           socket.emit("connected-user", {
    //             socketId: isExistCaller.socketId,
    //           });
    //         break;
    //     }
    //   }
    // });
    socket.on("webRTC-signaling", (data) => {
      console.log(data)
      const { connectedUserId } = data;
      const isExist = userExist(connectedUserId)
      if(isExist) io.to(isExist.socketId).emit("webRTC-signaling", data);
        
    });
    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
});

httpServer.listen(4002, () => {
  console.log(`server running successfull  `);
});
