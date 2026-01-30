import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import tweetRoutes from "./routes/tweet.routes.js"
import mentionRoutes from "./routes/mention.routes.js"
import cors from "cors"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/tweets", tweetRoutes)
app.use("/api/mentions", mentionRoutes)
app.listen(5000, () => {
  console.log("Server running on port 5000")
})
