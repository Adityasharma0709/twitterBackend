import { pool } from "../config/db.js"

export const createTweet = async (authorId, content) => {
  const res = await pool.query(
    `INSERT INTO tweets (content, author_id)
     VALUES ($1, $2)
     RETURNING id, content, author_id, created_at`,
    [content, authorId]
  )
  return res.rows[0]
}
export const getFeedTweets = async (userId) => {
  const res = await pool.query(
    `
    SELECT 
      t.id,
      t.content,
      t.author_id,
      t.created_at,
      u.username,
      u.name,
      COUNT(l.id) AS like_count,
      EXISTS (
        SELECT 1 FROM likes 
        WHERE likes.tweet_id = t.id 
        AND likes.user_id = $1
      ) AS is_liked
    FROM tweets t
    JOIN users u ON t.author_id = u.id
    LEFT JOIN likes l ON t.id = l.tweet_id
    WHERE 
      t.author_id = $1
      OR t.author_id IN (
        SELECT following_id 
        FROM follows 
        WHERE follower_id = $1
      )
    GROUP BY t.id, u.username, u.name
    ORDER BY t.created_at DESC
    LIMIT 50
    `,
    [userId]
  )

  return res.rows
}
export const findTweetById = async (tweetId) => {
  const res = await pool.query(
    `SELECT id, author_id FROM tweets WHERE id = $1`,
    [tweetId]
  )
  return res.rows[0]
}

export const deleteTweet = async (tweetId) => {
  await pool.query(
    `DELETE FROM tweets WHERE id = $1`,
    [tweetId]
  )
}
