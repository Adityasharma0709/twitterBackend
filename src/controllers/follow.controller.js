import { toggleFollowService } from "../services/follow.service.js"

export const toggleFollow = async (req, res) => {
  try {
    const currentUserId = req.user.id        // from JWT
    const targetUserId = req.params.id       // user to follow

    const result = await toggleFollowService(currentUserId, targetUserId)
    res.json(result)
  } catch (err) {
    res.status(400).json({
      msg: err.message || err
    })
  }
}
