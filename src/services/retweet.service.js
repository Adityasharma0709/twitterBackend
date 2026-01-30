import { findRetweet, addRetweet, removeRetweet } from "../repositories/retweet.repository.js"

export const toggleRetweetService = async (userId, tweetId) => {
  const existing = await findRetweet(userId, tweetId)

  if (existing) {
    await removeRetweet(userId, tweetId)
    return { reposted: false }
  }

  await addRetweet(userId, tweetId)
  return { reposted: true }
}
