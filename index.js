const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const logger = require("morgan")
const mongoose = require("mongoose")
const path = require("path")
const commentsRoutes = require("./routes/routesComments")

dotenv.config()
const PORT = process.env.PORT || 5000

function start() {
  const server = express()
  initialMiddlewares(server)
  initialRoutes(server)
  connectToDataBase()
  listen(server)
}

function initialMiddlewares(server) {
  server.use(express.json())
  server.use(cors({ origin: "*" }))
  server.use(logger("dev"))
  server.use(express.static(path.join(__dirname, "build")))
}

function initialRoutes(server) {
  server.use("/comments", commentsRoutes)
  server.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
  })
}

async function connectToDataBase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log("Everythink ok!")
  } catch (err) {
    process.exit("Oops!")
  }
}

function listen(server) {
  server.listen(PORT, () => {
    console.log(`Listening ${PORT}`)
  })
}

start()
