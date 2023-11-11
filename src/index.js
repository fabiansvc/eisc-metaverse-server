import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: ["http://localhost:3000", "https://eisc-metaverse.vercel.app"]
  },
});

io.listen(3001);

const avatars = []
const messages = []

io.on("connection", (socket) => {
  console.log("user connected");
  avatars.push({
    id: socket.id,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    url: ""
  })
  io.emit("avatars", avatars)

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

  socket.on("message", (message) => {
    messages.push(message)
    io.emit("messages", messages)
  })

  socket.on('call', (data) => {
    console.log('Llamada iniciada por: ' + socket.id);
    socket.broadcast.emit('call-broadcast', {signal: data.signalData});
  });
  
  socket.on("disconnect", () => {
    console.log('Usuario desconectado: ' + socket.id);
    avatars.splice(avatars.findIndex(avatar => avatar.id === socket.id), 1)
    io.emit("avatars", avatars)
  });
});
