"use strict";

/**
 * Module dependencies.
 */

import SocketServer from "./SocketServer.js";

/**
 * Load environment variables from .env file.
 */
const clientURLLocalhost = "http://localhost:3000";
const clientURLDeploy = "https://eisc-metaverse.vercel.app";
const port = 8000;

/**
 * Create and start the WebSocket server.
 */
const socketServer = new SocketServer(
  port,
  clientURLLocalhost,
  clientURLDeploy
);

/**
 * Start the WebSocket server.
 */
socketServer.start();
