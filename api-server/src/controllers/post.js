import { pool } from "../config/mysqlDB.js";
import { redisClient } from "../config/redis.js";

const redisChannel = process.env.REDIS_CHANNEL || "";
const publishToRedis = async (data) => {
    await redisClient.connect();
    //console.log('sdds')
    //console.log(data)
    //JSON.stringify({data});
    const subscriberCount = await redisClient.publish(redisChannel, JSON.stringify(data));
    console.log(subscriberCount)
    await redisClient.disconnect();
    return subscriberCount;
};

const setRedisCache = async (jsonData) => {
    const value = JSON.stringify({ isCached: "yes", data: jsonData });
    await redisClient.connect();
    await redisClient.set("key", value);
    return redisClient.disconnect();
};

const getRedisCache = async () => {
    await redisClient.connect();
    const cachedData = await redisClient.get("key");
    await redisClient.disconnect();
    return cachedData;
};

const deleteRedisCache = async () => {
    await redisClient.connect();
    await redisClient.del("key");
    return redisClient.disconnect();
};

export const readPost = async (req, res) => {
    try {
        const cachedData = await getRedisCache();
        if (cachedData) {
            const results = JSON.parse(cachedData);
            res.status(200).json({ message: "success", ...results });
            // ending the fn
            return;
        }
        const [rows] = await pool.query("SELECT * FROM posts");
        await setRedisCache(rows);
        res.status(200).json({ message: "success", isCached: "no", rows });
    } catch (error){
        res.json(error);
    }
};

export const createPost = async (req, res) => {
    //console.log('hello');
    const data  = req.body;
    try {
        if (!data) throw new Error("missing data");
        //await pool.query(`INSERT INTO posts (title, description, created_at) VALUES ('${data.title}', '${data.description}', '${data.created_at}')`);
        const subscriberCount = await publishToRedis(data);
        console.log({ subscriberCount });
        const test = await deleteRedisCache();
        res.status(200).json({ message: "success" });
    } catch (error) {
        console.log({ error });
        res.status(500).json({ message: "failure", error });
    }
};

export const updatePost = async (req, res) => {
    // const id = req.params.userId;
    // Post.update(id, new User(req.body), function (err, user) {
    //     if (err) {
    //         return res.status(403).send(err);
    //     }
    //     res.json(user);
    // });
};

export const deletePost = async (req, res) => {
    // const id = req.params.userId;
    // Post.delete(id, function (err, user) {
    //     if (err) {
    //         return res.status(403).send(err);
    //     }
    //     res.json(user);
    // });
};
