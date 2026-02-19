import { getMentionedTweets } from "../repositories/mention.repository.js"
import { catchAsync } from "../utils/catchAsync.js"

export const getMyMentions = catchAsync(async (req, res) => {
  const userId = req.user.id
  const tweets = await getMentionedTweets(userId)
  res.json(tweets)
});
