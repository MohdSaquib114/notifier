import { Schema, model, Document, Types } from 'mongoose';


interface Notifications extends Document {
  name: string;
  username: string;
  password: string;
  tasks: Types.ObjectId[];
}


const notificationSchema = new Schema<Notifications>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }] 
});


export const Notification = model<Notifications>('Notification', notificationSchema);
