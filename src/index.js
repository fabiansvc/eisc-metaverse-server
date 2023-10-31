const { App } = require("uWebSockets.js");
const { Server } = require("socket.io");
const app = App();
const io = new Server({
  cors: {
    origin: ["http://localhost:3000", "https://eisc-metaverse.vercel.app"]
  }
});
io.attachApp(app);
let allAvatars = [];

// Emit the avatars connected to all clients
const emitAllAvatars = async (allAvatars) => {
  console.log("Emitting all avatars", allAvatars);
  io.emit("avatars-connected", allAvatars);
};

io.on("connection", (socket) => {
  socket.on("connect-avatar", async (avatar) => {
    // Check if the avatar already exists in the allAvatars array
    const existingAvatar = allAvatars.find((a) => a.nickname === avatar.nickname);

    // If the avatar doesn't exist, create a new one
    if (!existingAvatar && avatar.avatarUrl !== "") {
      allAvatars.push(avatar);
    }
    // Emit the updated list of avatars connected to all clients
    emitAllAvatars(allAvatars);
  });

  socket.on("disconnect-avatar", async (nickname) => {
    // Remove the avatar from the allAvatars array if no other clients are connected to it
    allAvatars = allAvatars.filter((avatar) => avatar.nickname !== nickname);

    // Emit the updated list of avatars connected to all clients
    emitAllAvatars(allAvatars);
  });
});

app.listen(5000, (token) => {
  if (!token) {
    console.warn("port already in use");
  }
});
