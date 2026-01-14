import app from "./app";
import pool, { initializeDB } from "./confg/db"

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Connect to DB
    await pool.connect();
    console.log("Connected to the PostgreSQL database successfully.");

    // 2. Initialize DB (create tables if not exist)
    await initializeDB();

    // 3. Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the process with failure
  } 
};
startServer();
