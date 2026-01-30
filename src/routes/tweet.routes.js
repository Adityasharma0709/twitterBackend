import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createTweet } from "../controllers/tweet.controller.js";
import { toggleLike } from "../controllers/likes.controller.js  ";
import { getFeed, deleteTweet } from "../controllers/tweet.controller.js";

import { toggleRetweet } from "../controllers/retweet.controller.js";
const router = express.Router();
router.post("/:id/retweet", protect, toggleRetweet);

router.post("/", protect, createTweet);
router.post("/:id/like", protect, toggleLike);
router.get("/feed", protect, getFeed);
router.delete("/:id", protect, deleteTweet);
export default router;
