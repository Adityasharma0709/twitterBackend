import { findLike, addLike, removeLike } from "../repositories/likes.repository.js"

export const toggleLikeService = async (userId, tweetId) => {
  const existing = await findLike(userId, tweetId)

  if (existing) {
    await removeLike(userId, tweetId)
    return { liked: false }
  }

  await addLike(userId, tweetId)
  return { liked: true }
}
