import { toggleLikeService } from "../services/likes.service.js"

export const toggleLike = async (req, res) => {
  try {
    const userId = req.user.id
    const tweetId = req.params.id

    const result = await toggleLikeService(userId, tweetId)
    res.json(result)
  } catch (err) {
    res.status(400).json({
      msg: err.message || err
    })
  }
}
