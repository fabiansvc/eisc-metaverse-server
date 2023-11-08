import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: ["http://localhost:3000", "https://eisc-metaverse.vercel.app"]
  },
});

io.listen(3001);

const avatars = []

io.on("connection", (socket) => {
  console.log("user connected");
  avatars.push({
    id: socket.id,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    url: ""
  })
  io.emit("avatars", avatars)

  socket.on("callUser", (data) => {
    io.emit("hey", { signal: data.signalData })
  })

  socket.on("acceptCall", (data) => {
    io.emit("callAccepted", data.signal)
  })

  socket.on("url", (url) => {
    const avatar = avatars.find(avatar => avatar.id === socket.id)
    avatar.url = url
    io.emit("avatars", avatars)
  });

  socket.on("move", (values) => {
    const avatar = avatars.find(avatar => avatar.id === socket.id)
    avatar.position = values.position
    avatar.rotation = values.rotation
    io.emit("avatars", avatars)
  });

  socket.on("animation", (animation) => {
    const avatar = avatars.find(avatar => avatar.id === socket.id)
    avatar.animation = animation
    io.emit("avatars", avatars)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");
    avatars.splice(avatars.findIndex(avatar => avatar.id === socket.id), 1)
    io.emit("avatars", avatars)
  });
});
