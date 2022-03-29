import mongoose from "mongoose"
import config from "./config"

(async () => {
    try {
        const URI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.yqj3t.mongodb.net/${config.MONGO_DATABASE}?retryWrites=true&w=majority`
        const db = await mongoose.connect(URI)
        console.log(`Connected to MongoDB: ${db.connection.name}`)
    } catch (err) {
        console.log("Database connection error!", err)
    }
})()
