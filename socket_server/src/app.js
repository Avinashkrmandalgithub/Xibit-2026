import { Server } from "socket.io";
import { registerSocketEvents } from "./socket/socket.js";

export function createSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    registerSocketEvents(socket);
  });

  return io;
}
