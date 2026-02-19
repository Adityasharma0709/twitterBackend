import {
  registerService,
  loginService,
  getMeService,
  updateBioService
} from "../services/auth.service.js";
import { catchAsync } from "../utils/catchAsync.js";

export const register = catchAsync(async (req, res) => {
  const user = await registerService(req.body);
  res.json(user);
});

export const login = catchAsync(async (req, res) => {
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
});

export const getMe = catchAsync(async (req, res) => {
  const user = await getMeService(req.user.id);
  res.json(user);
});

export const updateBio = catchAsync(async (req, res) => {
  const { bio } = req.body;
  const userId = req.user.id; // from JWT middleware

  const user = await updateBioService(userId, bio);
  res.json(user);
});
