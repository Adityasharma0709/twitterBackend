import jwt from "jsonwebtoken"
import { findUserByEmail, createUser, findUserById } from "../repositories/auth.repository.js"
import { hashPassword, comparePassword } from "../utils/hash.js"
import * as bcrypt from 'bcrypt'
export const registerService = async (payload) => {
  payload.password = await hashPassword(payload.password)
  return await createUser(payload)
}

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user };
};

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
