import { WebSocketServer, WebSocket } from "ws";
import http from "http";

import config from "../config/config.js";

let wss: WebSocketServer;

export const initWebsocket = (server: http.Server) => {
  wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected via Websocket");

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(
    `Websocket server is listening at http://localhost:${config.port}/ws `,
  );
};

export const broadcastMessage = (msg: string) => {
  if (!wss) return;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
};
