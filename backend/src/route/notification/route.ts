import { Router, Request, Response } from "express";
import {Notification}  from '../../modal/notification';  
require("dotenv").config()

const route = Router()

route.put("/read", async (req: Request, res: Response) => {
    try {
      const { notificationIds } = req.body; 
     
      if (!notificationIds || !Array.isArray(notificationIds)) {
        return res.status(400).json({ error: "Invalid request. Provide an array of notification IDs." });
      }
  
      await Notification.updateMany(
        { _id: { $in: notificationIds }, isRead: false }, 
        { isRead: true }
      );
  
      res.json({success:true, message: "All otificatnions marked as read" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });



  route.put("/:id/read", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
  
      if (!notification) return res.status(404).json({ error: "Notification not found" });
  
      res.json({ success:true,message: "Notification marked as read", notification });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

route.get("/pagination", async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1; 
      const limit = parseInt(req.query.limit as string) || 10; 
      const skip = (page - 1) * limit; 
      
      const total = await Notification.countDocuments();
      const totalPages = Math.ceil(total / limit);
      console.log(page,totalPages)
  
      
      if (page > totalPages) {
        console.log("1")
        return res.json({
          success:false,
          message: "No more notifications available",
        });
      }
  
     
      const notifications = await Notification.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      res.json({
        success:true,
        page,
        totalPages,
        totalNotifications: total,
        notifications,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
export default route