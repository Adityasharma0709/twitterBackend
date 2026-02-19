import { toggleFollowService } from "../services/follow.service.js"
import { catchAsync } from "../utils/catchAsync.js"

export const toggleFollow = catchAsync(async (req, res) => {
  const currentUserId = req.user.id        // from JWT
  const targetUserId = req.params.id       // user to follow

  const result = await toggleFollowService(currentUserId, targetUserId)
  res.json(result)
});
