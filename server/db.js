// Import PostgreSQL package
import pg from "pg";
// Import dotenv package
import env from "dotenv";

// Load environment variables from .env file
env.config();
// Extract Pool class from pg package
const { Pool } = pg;
// Create PostgreSQL connection pool
const db = new Pool({
  // Database username
  user: process.env.DB_USER,
  // Database host
  host: process.env.DB_HOST,
  // Database name
  database: process.env.DB_NAME,
  // Database password
  password: process.env.DB_PASSWORD,
  // Database port number
  port: process.env.DB_PORT,
});

db.connect()
  .then(() => console.log("PostgreSQL Connected Successfully"))
  .catch((err) =>
    console.error("Database Connection Error:", err)
  );
// Export database connection
export default db;