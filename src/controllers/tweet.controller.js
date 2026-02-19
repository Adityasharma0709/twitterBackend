import { createTweetService, getFeedService, deleteTweetService } from "../services/tweet.service.js"
import { catchAsync } from "../utils/catchAsync.js"

export const createTweet = catchAsync(async (req, res) => {
  const { content } = req.body
  const userId = req.user.id

  const tweet = await createTweetService(userId, content)
  res.json(tweet)
});

export const getFeed = catchAsync(async (req, res) => {
  const userId = req.user.id
  const tweets = await getFeedService(userId)
  res.json(tweets)
});

export const deleteTweet = catchAsync(async (req, res) => {
  const userId = req.user.id
  const tweetId = req.params.id

  const result = await deleteTweetService(userId, tweetId)
  res.json(result)
});
