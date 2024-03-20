import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MYSQL_URL) {
  throw new Error("DB credentials error");
}
const connection = mysql.createPool(process.env.MYSQL_URL!);

export const db = drizzle(connection);
