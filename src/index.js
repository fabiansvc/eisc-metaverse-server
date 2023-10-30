const { App } = require("uWebSockets.js");
const { Server } = require("socket.io");

const app = App();
const io = new Server({
  cors: {
    origin: ["http://localhost:3000", "https://eisc-metaverse.vercel.app"]
  }
});

io.attachApp(app);

var avatars = [];

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
  });
});


app.listen(5000, (token) => {
  if (!token) {
    console.warn("port already in use");
  }
});
