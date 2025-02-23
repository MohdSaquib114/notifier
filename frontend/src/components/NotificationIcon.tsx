import { Bell } from "lucide-react"
import { useState } from "react"
import NotificationList from "./NotificationList"


export default function NotificationIcon() {
  const [isOpen, setIsOpen] = useState(false)


  const handleClick = () => {
    
      setIsOpen(!isOpen)
  
  }

  return (
       <div className="rounded-lg  p-2 hover:bg-slate-200/20 cursor-pointer" onClick={handleClick}>

        <button title="notification-button  cursor-pointer" className="flex focus:outline-none " >
          <Bell className="h-5 w-5" />
          <span className="h-1 w-1 rounded-full bg-red-500" />
        </button>
        {
           isOpen &&
           <div className="absolute lg:right-20 md:right-8 right-4 mt-3  shadow-lg border border-gray-300  rounded-lg bg-slate-800">
             <NotificationList  />
           </div>
        }
       </div>
      
     
  
  )
}

