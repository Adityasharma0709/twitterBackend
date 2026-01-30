import { pool } from "../config/db.js"

export const isFollowing = async (followerId, followingId) => {
  const res = await pool.query(
    `SELECT id FROM follows 
     WHERE follower_id=$1 AND following_id=$2`,
    [followerId, followingId]
  )
  return res.rows[0]
}

export const followUser = async (followerId, followingId) => {
  await pool.query(
    `INSERT INTO follows (follower_id, following_id)
     VALUES ($1, $2)`,
    [followerId, followingId]
  )
}

export const unfollowUser = async (followerId, followingId) => {
  await pool.query(
    `DELETE FROM follows 
     WHERE follower_id=$1 AND following_id=$2`,
    [followerId, followingId]
  )
}