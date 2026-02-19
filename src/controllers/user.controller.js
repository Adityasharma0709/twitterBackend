import { getPublicProfileService } from "../services/user.service.js"
import { catchAsync } from "../utils/catchAsync.js"

export const getPublicProfile = catchAsync(async (req, res) => {
  const viewerId = req.user.id
  const targetUserId = req.params.id

  const profile = await getPublicProfileService(viewerId, targetUserId)
  res.json(profile)
});
