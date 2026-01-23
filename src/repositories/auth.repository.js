import { pool } from "../config/db.js"

export const findUserByEmail = async (email) => {
  const res = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  )
  return res.rows[0]
}

export const createUser = async (data) => {
  const { name, username, email, password } = data

  const res = await pool.query(
    `INSERT INTO users(name,username,email,password)
     VALUES($1,$2,$3,$4)
     RETURNING id,name,username,email`,
    [name, username, email, password]
  )

  return res.rows[0]
}
