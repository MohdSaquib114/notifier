import { Router } from "express";
import notificationRoute from "./notification/route"


const route = Router()

route.use("/notification",notificationRoute)

export default route