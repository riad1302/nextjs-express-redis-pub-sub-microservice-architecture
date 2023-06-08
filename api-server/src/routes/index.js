import { Router } from "express";
import {
    readPost,
    createPost,
    deletePost,
    updatePost,
} from "../controllers/post.js";
const router = Router();

router.get("/post", readPost);
router.post("/post", createPost);
//router.get("/post/:postId", editCustomer);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;
