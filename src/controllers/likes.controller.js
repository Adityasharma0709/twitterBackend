import { toggleLikeService } from "../services/likes.service.js"
import { catchAsync } from "../utils/catchAsync.js"

export const toggleLike = catchAsync(async (req, res) => {
  const userId = req.user.id
  const tweetId = req.params.id

  const result = await toggleLikeService(userId, tweetId)
  res.json(result)
});
