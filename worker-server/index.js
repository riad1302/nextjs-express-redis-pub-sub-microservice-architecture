"use strict";
import dotenv from "dotenv";
import { createClient } from "redis";
import { pool } from "../config/mysqlDB.js";

dotenv.config();



// helper fn for DB
const createData = async (data) => {
    // const sqlQuery = `INSERT INTO ${sqlTable} (data) VALUES ('${data}')`;
    // const sqlConnection = await mysql.createConnection(pool);
    // return sqlConnection.execute(sqlQuery);
    return await pool.query(`INSERT INTO ${sqlTable} (data) VALUES ('${data}')`);

};

(function () {
    const subscriber = createClient({ url: redisUrl });
    subscriber.connect();

    // redis status logger
    subscriber.on("error", (err) => console.log("Redis error", err));
    subscriber.on("connect", () => console.log("\n Connected to Redis \n"));
    subscriber.on("reconnecting", () => {
        console.log("\nReconnecting to Redis.\n");
    });
    subscriber.on("ready", () => {
        console.log("\n Redis ready for action! \n");
        // call back fn is required
        subscriber.subscribe(redisChannel, async (message) => {
            console.log("subscriber service:- ", message);
            try {
                await createData(message);
            } catch (error) {
                console.log({ error });
            }
        });
    });
})();
