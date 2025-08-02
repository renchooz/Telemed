import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { initIO } from "./utils/socket.js";
import logger from "./middleware/logger.js";

// Routes
import doctorRoutes from "./routes/doctorRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

// Database
import { connectDb } from "./config/db.js";

// App setup
const app = express();
const server = http.createServer(app);

// Socket.IO server (WebSocket)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
initIO(io);

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(logger);

// Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/sessions", sessionRoutes);

// Connect to DB
connectDb();

// WebSocket events
io.on("connection", (socket) => {
  console.log("🧠 Socket connected:", socket.id);

  socket.on("doctorStatusChange", (data) => {
    io.emit("doctorStatusUpdated", data); // broadcast update
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

// Start server on PORT=4000
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
