import {
  getUserById,
  getUserTweets,
  getFollowerCount,
  getFollowingCount,
  isFollowingUser
} from "../repositories/user.repository.js"

export const getPublicProfileService = async (viewerId, targetUserId) => {
  const user = await getUserById(targetUserId)
  if (!user) throw new Error("User not found")

  const tweets = await getUserTweets(targetUserId)
  const followers = await getFollowerCount(targetUserId)
  const following = await getFollowingCount(targetUserId)
  const isFollowing = await isFollowingUser(viewerId, targetUserId)

  return {
    user,
    tweets,
    followers,
    following,
    isFollowing: !!isFollowing
  }
}
