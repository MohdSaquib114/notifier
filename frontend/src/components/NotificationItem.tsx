
import { UserPlus, Smartphone, FileText, ThumbsUp, MessageCircle, AtSign } from "lucide-react"

export interface Notification {
  _id: string
  user?:string
  type: "friend_request" | "new_device_login" | "tagged" | "like" | "comment" | "mention"
  message: string
  time: string
  isRead: boolean
}

const iconMap = {
  friend_request: UserPlus,
  new_device_login: Smartphone,
  tagged: FileText,
  like: ThumbsUp,
  comment: MessageCircle,
  mention: AtSign,
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
}

export default function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const Icon = iconMap[notification.type]

  return (
    <div
    className={`flex flex-col gap-2 p-3 cursor-pointer transition-all duration-300 rounded-lg ${
      notification.isRead ? "opacity-50" : ""
    } hover:bg-opacity-40 hover:backdrop-blur-lg hover:shadow-md  hover:border-white/20 hover:bg-white/20`}
    onClick={() => onMarkAsRead(notification._id)}
  >
    {/* Icon & Type */}
    <div className="flex items-center gap-3">
      <Icon className="h-6 w-6 " />
      <span className="text-xs sm:text-sm font-medium ">
        {notification.type
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
    </div>
  
    {/* Notification Content */}
    <div className="w-full text-xs sm:text-sm">
      <p className="leading-relaxed break-words">
        {notification.type !== "new_device_login" && (
          <span className="font-semibold text-blue-600">{notification.user}</span>
        )}{" "}
        {notification.message}
      </p>
      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
    </div>
  </div>
  
  
  )
}

