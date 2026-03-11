import axios from "axios";

const MAIN_SERVER_URL = process.env.MAIN_SERVER_URL || "http://localhost:3000";
let connectedClients = 0;

export function registerSocketEvents(socket) {
  connectedClients++;
  console.log(
    `[+] Client connected | ID: ${socket.id} | Total: ${connectedClients}`,
  );

  console.log(process.env.MAIN_SERVER_URL)

  const userId = socket.data.userId;

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`Client ${socket.id} joined room: ${userId}`);
  });

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
    console.log({ apiKey, query });

    try {
      const response = await axios.post(
        `${process.env.MAIN_SERVER_URL}`,
        { apiKey, query }
      );

      console.log("API response:", response.data);

      socket.emit("response", {
        success: true,
        answer: response.data.response,
        query,
      });

    } catch (error) {
      console.error("Axios error:", error.response?.data || error.message);

      socket.emit("error", {
        success: false,
        message: error.response?.data?.message || "Server error",
      });
    }
  });

  socket.on("disconnect", (reason) => {
    connectedClients--;
    console.log(
      `[-] Client disconnected | ID: ${socket.id} | Reason: ${reason} | Total: ${connectedClients}`,
    );
  });
}
