import jwt from "jsonwebtoken"
import { findUserByEmail, createUser, findUserById } from "../repositories/auth.repository.js"
import { hashPassword, comparePassword } from "../utils/hash.js"

export const registerService = async (payload) => {
  payload.password = await hashPassword(payload.password)
  return await createUser(payload)
}

export const loginService = async (email, password) => {

  const user = await findUserByEmail(email)
  if (!user) throw "User not found"

  const valid = await comparePassword(password, user.password)
  if (!valid) throw "Wrong password"
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )
  return token
}

export const getMeService=async (userId)=>{
  
  return await findUserById(userId);
}
import { updateUserBio } from "../repositories/auth.repository.js"

export const updateBioService = async (userId, bio) => {
  if (!bio || bio.trim() === "") {
    throw new Error("Bio cannot be empty")
  }
  return await updateUserBio(userId, bio)
}
