import { pool } from "../config/db.js"

export const findRetweet = async (userId, tweetId) => {
  const res = await pool.query(
    `SELECT id FROM retweets WHERE user_id=$1 AND tweet_id=$2`,
    [userId, tweetId]
  )
  return res.rows[0]
}

export const addRetweet = async (userId, tweetId) => {
  await pool.query(
    `INSERT INTO retweets (user_id, tweet_id)
     VALUES ($1, $2)`,
    [userId, tweetId]
  )
}

export const removeRetweet = async (userId, tweetId) => {
  await pool.query(
    `DELETE FROM retweets WHERE user_id=$1 AND tweet_id=$2`,
    [userId, tweetId]
  )
}
