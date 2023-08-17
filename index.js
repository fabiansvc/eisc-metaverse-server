'use strict';

const { log } = require("console");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your client's URL
  },
});

var avatars = [];

// server-side
io.on("connection", (socket) => {
  console.log("Client connected");

  // Emit the avatars to the newly connected client
  socket.emit("avatars", avatars);

  socket.on("client-send-avatar", (avatar) => {
    // Update the avatars array if the avatar is already in it
    const index = avatars.findIndex((a) => a.avatarUrl === avatar.avatarUrl);
    log(index);
    if (index !== -1) {
      avatars[index] = avatar;
    } else {
      avatars.push(avatar);
    }

    // Emit the avatars to all clients
    io.emit("avatars", avatars);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = 5000;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
