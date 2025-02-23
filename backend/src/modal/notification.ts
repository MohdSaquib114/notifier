import mongoose, { Document, Schema, Model } from "mongoose";
interface INotification extends Document {
  user?: string; 
  type: "friend_request" | "like" | "comment" | "tagged" | "new_device_login" | "mention";
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const notificationSchema: Schema = new Schema({
  user: { type: String, required: false },
  type: { 
    type: String, 
    enum: ["friend_request", "like", "comment", "tagged", "new_device_login", "mention"], 
    required: true 
  },
  message: { type: String, required: true }, 
  isRead: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now }
});


const Notification: Model<INotification> = mongoose.model<INotification>("Notification", notificationSchema);

export { Notification, INotification };
