import { toggleRetweetService } from "../services/retweet.service.js"
import { catchAsync } from "../utils/catchAsync.js"

export const toggleRetweet = catchAsync(async (req, res) => {
  const userId = req.user.id
  const tweetId = req.params.id

  const result = await toggleRetweetService(userId, tweetId)
  res.json(result)
});
