import { pool } from "../config/db.js"

export const getUserById = async (userId) => {
  const res = await pool.query(
    `SELECT id, name, username, bio 
     FROM users 
     WHERE id = $1`,
    [userId]
  )
  return res.rows[0]
}

export const getUserTweets = async (userId) => {
  const res = await pool.query(
    `SELECT id, content, created_at
     FROM tweets
     WHERE author_id = $1
     ORDER BY created_at DESC`,
    [userId]
  )
  return res.rows
}

export const getFollowerCount = async (userId) => {
  const res = await pool.query(
    `SELECT COUNT(*) AS count 
     FROM follows 
     WHERE following_id = $1`,
    [userId]
  )
  return res.rows[0].count
}

export const getFollowingCount = async (userId) => {
  const res = await pool.query(
    `SELECT COUNT(*) AS count 
     FROM follows 
     WHERE follower_id = $1`,
    [userId]
  )
  return res.rows[0].count
}

export const isFollowingUser = async (viewerId, targetUserId) => {
  const res = await pool.query(
    `SELECT id FROM follows 
     WHERE follower_id=$1 AND following_id=$2`,
    [viewerId, targetUserId]
  )
  return res.rows[0]
}
