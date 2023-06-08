import { pool } from "../config/mysqlDB.js";

export const readPost = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM posts");
        if (rows) {
            res.json(rows);
        }
    } catch (error){
        res.json(error);
    }
};

export const createPost = async (req, res) => {
    console.log('hello');
    // if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    //     return res.status(422).json({
    //         firstName: "firstname is required",
    //         lastName: "firstname is required",
    //         email: "email is required",
    //     });
    // }
    // const user = new User(req.body);
    // Post.create(user, function (err, user) {
    //     if (err) {
    //         return res.status(403).send(err);
    //     }
    //     res.json(user);
    // });
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
