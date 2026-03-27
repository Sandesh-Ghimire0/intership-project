import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import { app } from "./app.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { activitySocket } from "./routes/v1/activity/activity.socket.js";

const server = createServer(app);
export const io = new Server(server, {
    cors: { origin: "http://localhost:3000" },
});

const PORT = process.env.PORT || 4000;

activitySocket.initialize();

const startServer = async () => {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log(`api server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
