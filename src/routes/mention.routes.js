import express from "express"
import { protect } from "../middleware/auth.middleware.js"
import { getMyMentions } from "../controllers/mention.controller.js"

const router = express.Router()

router.get("/", protect, getMyMentions)

export default router
