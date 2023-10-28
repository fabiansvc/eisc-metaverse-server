
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "https://eisc-metaverse.vercel.app"
  }
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
  });
});

const PORT = 5000;

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
