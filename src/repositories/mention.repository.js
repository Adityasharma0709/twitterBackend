import { pool } from "../config/db.js"

export const findUsersByUsernames = async (usernames) => {
  const res = await pool.query(
    `SELECT id, username FROM users WHERE username = ANY($1)`,
    [usernames]
  )
  return res.rows
}

export const saveMention = async (tweetId, userId) => {
  await pool.query(
    `INSERT INTO mentions (tweet_id, mentioned_user_id)
     VALUES ($1, $2)`,
    [tweetId, userId]
  )
}

export const getMentionedTweets = async (userId) => {
  const res = await pool.query(
    `
    SELECT t.id, t.content, t.created_at, u.username
    FROM mentions m
    JOIN tweets t ON m.tweet_id = t.id
    JOIN users u ON t.author_id = u.id
    WHERE m.mentioned_user_id = $1
    ORDER BY t.created_at DESC
    `,
    [userId]
  )
  return res.rows
}
