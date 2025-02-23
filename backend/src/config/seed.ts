import connectDB from "./db";
import { Notification } from "../modal/notification";
import notifications from "../data/notification.json"

(async function(){
    try {
        await connectDB()
        console.log("Database connected")
        await Notification.deleteMany({})
        console.log("Clear database \n Adding new data")
        await Notification.insertMany(notifications)
        console.log("Database updated")
      
        
    } catch (error) {
        console.log(error)
    }
})()

