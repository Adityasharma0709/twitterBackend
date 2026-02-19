import {
  registerService,
  loginService,
  getMeService,
} from "../services/auth.service.js";
import * as bcrypt from 'bcrypt'
import { updateBioService } from "../services/auth.service.js";
export const register = async (req, res) => {
  try {
    const user = await registerService(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await loginService(email, password);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    res.status(400).json({
      msg: err.message || err,
    });
  }
};


export const getMe = async (req, res) => {
  try {
    const user = await getMeService(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({
      msg: err.message,
    });
  }
};

export const updateBio = async (req, res) => {
  try {
    const { bio } = req.body;
    const userId = req.user.id; // from JWT middleware

    const user = await updateBioService(userId, bio);
    res.json(user);
  } catch (err) {
    res.status(400).json({
      msg: err.message || err,
    });
  }
};
