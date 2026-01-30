import { pool } from "../config/db.js"

export const findLike = async (userId, tweetId) => {
  const res = await pool.query(
    `SELECT id FROM likes 
     WHERE user_id=$1 AND tweet_id=$2`,
    [userId, tweetId]
  )
  return res.rows[0]
}

export const addLike = async (userId, tweetId) => {
  await pool.query(
    `INSERT INTO likes (user_id, tweet_id)
     VALUES ($1, $2)`,
    [userId, tweetId]
  )
}

export const removeLike = async (userId, tweetId) => {
  await pool.query(
    `DELETE FROM likes 
     WHERE user_id=$1 AND tweet_id=$2`,
    [userId, tweetId]
  )
}
