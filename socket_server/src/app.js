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
    const userId = socket.handshake.auth?.userId;

    if (!userId) {
        socket.disconnect(true);
        return;
    }
    console.log(`New client connected: ${userId}`);
    socket.join(userId);

    socket.data.userId = userId;

    registerSocketEvents(socket);
    
  });

  return io;
}
