"use strict";

const { createServer } = require("http");
const httpServer = createServer();

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://eisc-metaverse.vercel.app",
    methods: ["GET", "POST"],
  },
});

var avatars = [];

// server-side
io.on("connection", (socket) => {
  socket.on("client-send-avatar", async (avatar) => {
    const index = avatars.findIndex((a) => a.nickname === avatar.nickname);
    if (index !== -1) {
      avatars[index] = avatar;
    } else if (avatar.avatarUrl !== "") {
      avatars.push(avatar);
    }

    // Emit the avatars to all clients
    await io.emit("server-send-avatars", avatars);

    // Agregar el siguiente código
    socket.setHeader("Access-Control-Allow-Origin", "https://eisc-metaverse.vercel.app");
    socket.setHeader("Access-Control-Allow-Methods", "GET, POST");
  });
});

const PORT = 5000;

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});