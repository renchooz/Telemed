import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:4000", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("🟢 Connected to WebSocket:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected from WebSocket");
    });
  }

  return socket;
};
