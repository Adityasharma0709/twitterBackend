import { getPublicProfileService } from "../services/user.service.js"

export const getPublicProfile = async (req, res) => {
  try {
    const viewerId = req.user.id
    const targetUserId = req.params.id

    const profile = await getPublicProfileService(viewerId, targetUserId)
    res.json(profile)
  } catch (err) {
    res.status(400).json({
      msg: err.message || err
    })
  }
}
