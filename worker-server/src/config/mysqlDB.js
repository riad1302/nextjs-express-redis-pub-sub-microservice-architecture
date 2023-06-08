import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const sqlHost = process.env.MYSQL_HOST || "";
const sqlUser = process.env.MYSQL_USERNAME || "";
const sqlPassword = process.env.MYSQL_PASSWORD || "";
const sqlDatabase = process.env.MYSQL_DATABASE || "";
export const pool = createPool({
    host: sqlHost,
    user: sqlUser,
    password: sqlPassword,
    port: 3306,
    database: sqlDatabase,
});
