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
      this.handleAvatarConnected(socket);
      this.handleMove(socket);
      this.handleAnimation(socket);
      this.handleAvatarUpdated(socket);
      this.handleMessages(socket);
      this.handleDisconnect(socket);
    });
  }

  /**
   * Handle a new connection.
   * @param {SocketIO.Socket} socket The socket of the new connection.
   */
  handleNewConnection(socket) {
    if (
      !this.avatarManager.getAvatars().some((avatar) => avatar.id === socket.id)
    ) {
      console.log("New avatar connected with ID " + socket.id + ".");
      const newAvatar = new Avatar(socket.id, [0, 0, 0], [0, 0, 0], "", "", "");
      this.avatarManager.addAvatar(newAvatar);
      this.sendAvatarsConnected(socket);
    }
  }

  /**
   * Handle data from the user.
   * @param {SocketIO.Socket} socket The socket of the user.
   */
  handleAvatarConnected(socket) {
    socket.on("avatar-connected", (valuesUser) => {
      this.avatarManager.updateAvatar(socket.id, valuesUser);
      socket.broadcast.emit("avatars", this.avatarManager.getAvatars());
    });
  }

  /**
   * Handle avatar movement.
   * @param {SocketIO.Socket} socket The socket of the avatar.
   */
  handleMove(socket) {
    socket.on("move", (values) => {
      this.avatarManager.updateAvatar(socket.id, values);
      this.sendAvatarsConnected(socket);
    });
  }

  /**
   * Handle avatar animation.
   * @param {SocketIO.Socket} socket The socket of the avatar.
   */
  handleAnimation(socket) {
    socket.on("animation", (animation) => {
      this.avatarManager.updateAvatar(socket.id, { animation });
      this.sendAvatarsConnected(socket);
    });
  }

  /**
   * Handle avatar editing.
   * @param {SocketIO.Socket} socket The socket of the avatar.
   */
  handleAvatarUpdated(socket) {
    socket.on("avatar-updated", () => {
      this.avatarManager.updateAvatar(socket.id, {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        email: "",
        nickname: "",
        avatarUrl: "",
        animation: "",
      });
      this.sendAvatarsConnected(socket);
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

  sendAvatarsConnected(socket) {
    if (this.avatarManager.getAvatars().length > 0) {
      socket.emit("avatars", this.avatarManager.getAvatars());
    }
  }
}
