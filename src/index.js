"use strict";

/**
 * Module dependencies.
 */

import SocketServer from "./SocketServer.js";

/**
 * Load environment variables from .env file.
 */
const clientURLLocalhost = process.env.CLIENT_URL_LOCALHOST;
const clientURLDeploy = process.env.CLIENT_URL_DEPLOY;
const port = process.env.PORT;

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
