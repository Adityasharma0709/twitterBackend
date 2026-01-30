import { createTweetService } from "../services/tweet.service.js"
import { getFeedService,deleteTweetService } from "../services/tweet.service.js"

export const createTweet = async (req, res) => {
  try {
    const { content } = req.body   // ✅ DEFINE content here
    const userId = req.user.id

    const tweet = await createTweetService(userId, content)
    res.json(tweet)                // ✅ return tweet
  } catch (err) {
    res.status(400).json({
      msg: err.message || err
    })
  }
}



export const getFeed = async (req, res) => {
  try {
    const userId = req.user.id
    const tweets = await getFeedService(userId)
    res.json(tweets)
  } catch (err) {
    res.status(400).json({
      msg: err.message || err
    })
  }
}

export const deleteTweet = async (req, res) => {
  try {
    const userId = req.user.id
    const tweetId = req.params.id

    const result = await deleteTweetService(userId, tweetId)
    res.json(result)
  } catch (err) {
    res.status(400).json({
      msg: err.message || err
    })
  }
}
