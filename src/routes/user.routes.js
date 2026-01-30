import express from "express"
import { protect } from "../middleware/auth.middleware.js"
import { toggleFollow } from "../controllers/follow.controller.js"
import { getPublicProfile } from "../controllers/user.controller.js"

const router = express.Router()

router.post("/:id/follow", protect, toggleFollow)
router.get("/:id",protect,getPublicProfile)
export default router
