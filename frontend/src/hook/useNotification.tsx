import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Notification } from "../components/NotificationItem"

const url : string = import.meta.env.VITE_API_URL
//fetch first 10 notifications from the backend and set it to the notifications state and set the totalPages ref to the totla 
// number of pages or chunk for the notifications
export const useNotification = () => {
   const [notifications,setNotifications] = useState<Notification[] | []>([])
   const [initialLoading,setInitialLoading] = useState(true)
   const totalPages = useRef(0)

   useEffect(()=>{

    const fetchFirstNotifications = async () => {
        try {
            const {data} = await axios.get(`${url}/pagination`)
            if(data.success){
                setNotifications(data.notifications)
                totalPages.current = data.totalPages
            }
        
        } catch (error) {
            console.log(error)
        }finally{
            setInitialLoading(false)
        }
    }
    fetchFirstNotifications()
   },[])

   return {notifications,setNotifications,initialLoading,totalPages}
}