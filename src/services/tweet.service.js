import { createTweet } from "../repositories/tweet.repository.js"
import { getFeedTweets,findTweetById, deleteTweet } from "../repositories/tweet.repository.js"
import { findUsersByUsernames } from "../repositories/mention.repository.js"
import { saveMention } from "../repositories/mention.repository.js"
export const createTweetService = async (userId, content) => {
  if (!content || content.trim() === "") {
    throw new Error("Tweet cannot be empty")
  }

  const tweet = await createTweet(userId, content)

  // handle mentions
  const usernames = extractMentions(content)
  if (usernames.length > 0) {
    const users = await findUsersByUsernames(usernames)
    for (const u of users) {
      await saveMention(tweet.id, u.id)
    }
  }
  console.log("Service tweet:", tweet)

}

export const getFeedService = async (userId) => {
  return await getFeedTweets(userId)
}

export const deleteTweetService = async (userId, tweetId) => {
  const tweet = await findTweetById(tweetId)
  if (!tweet) {
    throw new Error("Tweet not found")
  }

  if (tweet.author_id !== userId) {
    throw new Error("You are not allowed to delete this tweet")
  }

  await deleteTweet(tweetId)
  return { msg: "Tweet deleted successfully" }
}


export const extractMentions = (text) => {
  const matches = text.match(/@\w+/g)
  return matches ? matches.map(m => m.slice(1).toLowerCase()) : []
}
