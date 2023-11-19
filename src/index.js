import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: ["http://localhost:3000", "https://eisc-metaverse.vercel.app"]
  },
});

io.listen(3001);

const avatars = []

io.on("connection", (socket) => {
  const newAvatar = avatars.find(avatar => avatar.id === socket.id)

  if (!newAvatar) {
    console.log("user connected");
    avatars.push({
      id: socket.id,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      email: "",
      nickname: "",
      avatarUrl: ""
    })
  }

  io.emit("avatars", avatars)

  socket.on("data-user", (valuesUser) => {
    
    const avatar = avatars.find(avatar => avatar.id === socket.id)
    avatar.email = valuesUser.email
    avatar.nickname = valuesUser.nickname
    avatar.avatarUrl = valuesUser.avatarUrl
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

  socket.on("avatarEditing", ()=>{
    const avatar = avatars.find(avatar => avatar.id === socket.id)
    avatar.position = [0, 0, 0]
    avatar.rotation = [0, 0, 0]
    avatar.url = ""
    avatar.animation = ""
    io.emit("avatars", avatars)
  })

  socket.on("disconnect", () => {
    console.log('Usuario desconectado: ' + socket.id);
    avatars.splice(avatars.findIndex(avatar => avatar.id === socket.id), 1)
    io.emit("avatars", avatars)
  });
});
