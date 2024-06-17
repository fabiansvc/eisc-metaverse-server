"use strict";

/**
 * Module dependencies.
 */
import { Server } from "socket.io";
import AvatarManager from "./AvatarManager.js";
import Avatar from "./Avatar.js";

/**
 * SocketServer class representing a WebSocket server.
 */
export default class SocketServer {
  /**
   * Constructor of the SocketServer class.
   * @param {number} port The port number for the WebSocket server.
   * @param {string} clientURLLocalhost The URL for the localhost client.
   * @param {string} clientURLDeploy The URL for the deployed client.
   */
  constructor(port, clientURLLocalhost, clientURLDeploy) {
    this.port = port;
    this.clientURLLocalhost = clientURLLocalhost;
    this.clientURLDeploy = clientURLDeploy;
    this.io = new Server({
      cors: {
        origin: [clientURLLocalhost, clientURLDeploy],
      },
    });
    this.avatarManager = new AvatarManager();
  }

  /**
   * Start the WebSocket server.
   */
  start() {
    this.io.listen(this.port);
    this.handleConnections();
    console.log(`Server listening on port ${this.port}`);
  }

  /**
   * Handle incoming connections.
   */
  handleConnections() {
    this.io.on("connection", (socket) => {
      this.handleNewConnection(socket);
      this.handleUpdateAvatar(socket);
      this.handleMessages(socket);
      this.handleDisconnect(socket);
      this.handleUpgradeAvatar(socket);
    });
  }

  /**
   * Handle a new connection.
   * @param {SocketIO.Socket} socket The socket of the new connection.
   */
  handleNewConnection(socket) {
    if (
      !this.avatarManager.readAvatars().some((avatar) => avatar.id === socket.id)
    ) {
      console.log(
        "New avatar connected with ID " +
          socket.id +
          ". There are " +
          this.io.engine.clientsCount +
          " avatars connected"
      );
      const newAvatar = new Avatar(
        socket.id,
        [0, 0, 0],
        [0, 0, 0],
        "",
        "",
        ""
      );
      this.avatarManager.createAvatar(newAvatar);
    }
  }

  /**
   * Handle avatar editing.
   * @param {SocketIO.Socket} socket The socket of the avatar.
   */
  handleUpdateAvatar(socket) {
    socket.on("update-avatar", (newData) => {
      const res = this.avatarManager.updateAvatar(socket.id, newData);
      res
        ? this.sendAvatarsConnected()
        : console.log("Avatar with " + socket.id + " not found!");
    });
  }

  /**
   * Handle chat messages.
   * @param {SocketIO.Socket} socket The socket of the user.
   */
  handleMessages(socket) {
    socket.on("message", (message) => {
      this.io.emit("newMessage", message);
    });
  }

  /**
   * Handle disconnection of an avatar.
   * @param {SocketIO.Socket} socket The socket of the disconnected avatar.
   */
  handleDisconnect(socket) {
    socket.on("disconnect", () => {
      this.avatarManager.removeAvatar(socket.id);
      console.log(
        `Avatar disconnected with ID ${socket.id}. There are ${this.io.engine.clientsCount} avatars connected.`
      );
      this.sendAvatarsConnected(socket);
    });
  }

  handleUpgradeAvatar(socket){
    socket.on("upgrade-avatar", (newUpgradeData) => {
      this.avatarManager.upgradeAvatar(socket.id, newUpgradeData);
      this.sendAvatarsConnected(socket)
    });
  }

  sendAvatarsConnected(socket) {
    if (this.avatarManager.readAvatars().length > 0) {
      socket.broadcast.emit("avatars", this.avatarManager.readAvatars());
    }
  }
}
