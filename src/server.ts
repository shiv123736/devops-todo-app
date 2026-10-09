import app from "./app";
// import pool from "./config/db"
import prisma from "./utils/prisma";
import { Server } from "http";


const PORT = process.env.PORT || 3000;
let server: Server;

const startServer = async () => {
  try {
    // 1. Connect to DB
    // await pool.connect();
    // console.log("Connected to the PostgreSQL database successfully.");

    // 2. Initialize DB (create tables if not exist)
    // await initializeDB();

    // 3. Start the server
    server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the process with failure
  } 
};
startServer();


// Graceful shutdown
const shutdown = async () => {
  console.log("Shutting down server...");
  // 1. Stop accepting new requests
  server.close(() => {
    console.log("HTTP Server closed.");
  });

  // 2. Close DB connection
  // pool.end(() => {
  //   console.log("Database connection closed.");    
  //   process.exit(0); // Exit the process with success
  // });

  // 3. close prisma db connection
  try {
    await prisma.$disconnect();
    console.log("Prisma disconnected successfully.");
  } catch (error) {
    console.error("Error during Prisma disconnection:", error);
  }

  process.exit(0); // Exit the process with success
}

// listen for termination signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
