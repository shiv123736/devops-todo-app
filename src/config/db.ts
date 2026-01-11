import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

// Read environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Create a new PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    database: process.env.DB_NAME,
});

// Add function to creat the todos table if it doesn't exist
export const initializeDB = async (): Promise<void> => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                task VARCHAR(255) NOT NULL,
                completed BOOLEAN DEFAULT FALSE
            );
        `;
        await pool.query(createTableQuery);
        console.log("Todos table is ready.");
    }
    catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
}

export default pool;