import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { createSocketServer } from "./src/app.js";

const PORT = process.env.SOCKET_PORT || 5001;

const httpServer = http.createServer();
createSocketServer(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Socket server is running on ${PORT}`);
  console.log(
    `Main server URL: ${process.env.MAIN_SERVER_URL || "http://localhost:3000"}`,
  );
});
