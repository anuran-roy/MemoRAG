import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from "postgres";
import { dbUrl } from "../config.js";
// for migrations
// const migrationClient = postgres(process.env.DB_URL, { max: 1 });
// migrate(drizzle(migrationClient), ...)

// for query purposes
console.log("Database connection string = ", process.env.DB_URL);
const queryClient = postgres(dbUrl, { max: 5 });
export const db: PostgresJsDatabase = drizzle(queryClient);
// await db.select().from(...)...

// await migrate(db, { migrationsFolder: "../../drizzle/migrations" });
