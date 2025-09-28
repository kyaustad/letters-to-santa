import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/env";
import * as schema from "./schema";

// Configure connection pool optimized for serverless with transaction pooler
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // Connection pool settings for serverless + transaction pooler
  max: 10, // Allow more concurrent connections for transaction pooler
  min: 0, // Start with no connections
  idleTimeoutMillis: 5000, // Close idle connections faster (transaction pooler is quick to connect)
  connectionTimeoutMillis: 10000, // Fail faster if can't connect
  maxUses: 10000, // Slightly higher since transaction pooler handles connection recycling
  allowExitOnIdle: true,
});

// Handle pool errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  // Don't exit the process in serverless, just log the error
  if (process.env.NODE_ENV === "development") {
    process.exit(-1);
  }
});

// Handle process termination gracefully
const gracefulShutdown = () => {
  console.log("Received shutdown signal, closing database pool...");
  pool.end(() => {
    console.log("Database pool closed");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

export const db = drizzle(pool, { schema });
