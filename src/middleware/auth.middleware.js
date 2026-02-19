import jwt from "jsonwebtoken"

export const protect = (req, res, next) => {
  try {
    console.log("Authorization header:", req.headers.authorization)

    const token = req.headers.authorization?.split(" ")[1]

    console.log("Extracted token:", token)

    if (!token) {
      return res.status(401).json({ msg: "No token" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log("Decoded:", decoded)

    req.user = { id: decoded.userId }

    console.log("req.user:", req.user)

    next()
  } catch (err) {
    console.log("JWT ERROR:", err)
    res.status(401).json({ msg: "Invalid token" })
  }
}
