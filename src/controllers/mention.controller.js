import { getMentionedTweets } from "../repositories/mention.repository.js"

export const getMyMentions = async (req, res) => {
  try {
    const userId = req.user.id
    const tweets = await getMentionedTweets(userId)
    res.json(tweets)
  } catch (err) {
    res.status(400).json({ msg: err.message || err })
  }
}
