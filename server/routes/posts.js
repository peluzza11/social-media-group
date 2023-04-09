import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/", verifyToken, getFeedPosts); /*this will grab the user feed when we are from the hompage*/
router.get("/:userId/posts", verifyToken, getUserPosts); /*this will involve the user Id because we want to grab only the users post*/

/*UPDATE*/
router.patch("/:id/like", verifyToken, likePost);/* this is liking the post and unliking it*/

export default router;