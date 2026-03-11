import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import http from "http";
import axios from "axios";

const PORT = process.env.SOCKET_PORT || 5001;
const MAIN_SERVER_URL = process.env.MAIN_SERVER_URL || "http://localhost:3000";

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let connectedClients = 0;
io.on("connection", (socket) => {
  connectedClients++;
  console.log(
    `[+] client connected | ID: ${socket.id} | Total: ${connectedClients}`,
  );

  socket.on("query", async (data) => {
    console.log(`[→] Query received from ${socket.id}`);

    if (!data || !data.apiKey || !data.query) {
      socket.emit("error", {
        success: false,
        message: "apiKey aur Query dono required hai!",
      });
      return;
    }

    const { apiKey, query } = data;
    socket.emit("status", {
      message: "Processing...",
    });

    try {
      const response = await axios.post(
        `${MAIN_SERVER_URL}/api/query`,
        { apiKey, query },
      );

      socket.emit("response", {
        success: true,
        answer: response.response,
        query: query,
      });

      console.log(`[✓] Response sent to ${socket.id}`);
    } catch (error) {
      console.error(`[✗] Error for ${socket.id}:`, error.message);
      if (error.response?.status === 401) {
        socket.emit("error", {
          success: false,
          message: "Invalid API Key",
        });
      } else if (error.response?.status === 429) {
        socket.emit("error", {
          success: false,
          message: "Rate limit exceed ho gaya, thoda wait karo",
        });
      } else if (error.code === "ECONNABORTED") {
        socket.emit("error", {
          success: false,
          message: "Request timeout ho gayi",
        });
      } else {
        socket.emit("error", {
          success: false,
          message: error.response?.data?.message || "Server error aaya",
        });
      }
    }
  });

  socket.on("disconnect", (reason) => {
    connectedClients--;
    console.log(
      `[-] Client disconnected | ID: ${socket.id} | Reason: ${reason} | Total: ${connectedClients}`,
    );
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket server is running on ${PORT}`);
  console.log(`Main server is running on ${MAIN_SERVER_URL}`);
});
