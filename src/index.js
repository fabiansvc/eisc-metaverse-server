import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: ["https://eisc-metaverse.vercel.app", "http://localhost:3000"]
  },
});

io.listen(3001);

const avatars = []

io.on("connection", (socket) => {

  if (!avatars[socket.id]) {
    avatars.push({
      id: socket.id,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      email: "",
      nickname: "",
      avatarUrl: "",
    })
    console.log("Avatar joined with ID", socket.id,". There are " + io.engine.clientsCount + " avatars connected.");
    io.emit("avatars", avatars)
  }

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

  socket.on("avatarEditing", () => {
    const avatar = avatars.find(avatar => avatar.id === socket.id)
    avatar.position = [0, 0, 0]
    avatar.rotation = [0, 0, 0]
    avatar.email = ""
    avatar.nickname = ""
    avatar.avatarUrl = ""
    avatar.animation = ""
    io.emit("avatars", avatars)
  })

  socket.on("message", (message) => {
    io.emit("newMessage", message)
  })

  socket.on("disconnect", () => {
    avatars.splice(avatars.findIndex(avatar => avatar.id === socket.id), 1)
    io.emit("avatars", avatars)
    console.log("Avatar disconnected with ID", socket.id,". There are " + io.engine.clientsCount + " avatars connected.");
  });
});
