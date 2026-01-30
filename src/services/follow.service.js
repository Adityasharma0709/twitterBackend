import { isFollowing, followUser, unfollowUser } from "../repositories/follow.repository.js"

export const toggleFollowService = async (currentUserId, targetUserId) => {
  if (currentUserId === targetUserId) {
    throw new Error("You cannot follow yourself")
  }

  const alreadyFollowing = await isFollowing(currentUserId, targetUserId)

  if (alreadyFollowing) {
    await unfollowUser(currentUserId, targetUserId)
    return { followed: false }
  }

  await followUser(currentUserId, targetUserId)
  return { followed: true }
}
