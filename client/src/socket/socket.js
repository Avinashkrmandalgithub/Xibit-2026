import { io } from "socket.io-client";

let storedUserId = localStorage.getItem("userId");

export const socket = io(`${import.meta.env.VITE_SOCKET_SERVER_URL}`, {
    auth: { userId: storedUserId },
    transports: ["websocket", "polling"],
});