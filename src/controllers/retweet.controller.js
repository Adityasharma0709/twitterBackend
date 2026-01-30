import { toggleRetweetService } from "../services/retweet.service.js"

export const toggleRetweet = async (req, res) => {
  try {
    const userId = req.user.id
    const tweetId = req.params.id

    const result = await toggleRetweetService(userId, tweetId)
    res.json(result)
  } catch (err) {
    res.status(400).json({
      msg: err.message || err
    })
  }
}
