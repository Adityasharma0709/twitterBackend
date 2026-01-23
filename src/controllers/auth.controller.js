import { registerService, loginService } from "../services/auth.service.js"

export const register = async (req, res) => {
  try {
    const user = await registerService(req.body)
    res.json(user)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const token = await loginService(email, password)

    res.json({ token })
  } catch (err) {
    console.error("LOGIN ERROR:", err)
    res.status(400).json({
      msg: err.message || err
    })
  }
}

