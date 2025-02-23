import { useState, useEffect, useRef, useCallback } from "react"
import NotificationItem from "./NotificationItem"
import { LoaderCircle } from "lucide-react"
import { useNotification } from "../hook/useNotification"
import axios from "axios"

const url = import.meta.env.VITE_API_URL

export default function NotificationList() {
 

  const observerTarget = useRef(null)
  //This custom hook fetch the initial notfications when this component render and set the totalPage send by the backend
  const {notifications,setNotifications,initialLoading,totalPages} = useNotification()
  //Used useRef hook to avoid unnecessary rendering on increasing the page number which help in not making twice or more backned call in loadMoreNotifications  at a same time
  const pageRef = useRef(2);
  const [loading,setLoading] = useState(false);
  
  //This function make call to backend to get the next chunk of notifications 
  const loadMoreNotifications = useCallback(async () => {
    try {
      setLoading(true) 
      const { data } = await axios.get(`${url}/pagination?page=${pageRef.current}&limit=10`);
      if (data.success) {
        setNotifications((prev) => [...prev, ...data.notifications]);
        pageRef.current += 1; 
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
       setTimeout(()=> setLoading(false),2000)
    }
  }, [setNotifications]); 
  
  
  
//Using intersection observer api to detect for the div at last in the contaner to appear for loading more notificatiosn
useEffect(() => {
  //It return if ref is pointing to undefined
  if (!observerTarget.current) return;
  //If total pages is less than the number of page than dont make any call to loadMoreNotifications method
  if(totalPages.current < pageRef.current) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !initialLoading && !loading) {
        loadMoreNotifications();
      }
    },
    { threshold: 1 }
  );
  observer.observe(observerTarget.current);
  return () => observer.disconnect(); 

}, 
[initialLoading, loadMoreNotifications,loading,totalPages]); 




  //Send request to backend to mark the notification by the id parameter as read
  const handleMarkAsRead = async (id: string) => {
    try {
      const {data:{notification }} = await axios.put(`${url}/${id}/read`)
      setNotifications((prev) => prev.map((notif) => (notif._id === notification._id ? { ...notif, isRead: true } : notif)))
    } catch (error) {
      (error)
    }
  }



  //Send request to backend to make current state of notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      const {data} = await axios.put(`${url}/read`,{
        notificationIds:notifications .map(notfication=>notfication._id) })
       if(data.success) setNotifications((prev) =>   prev.map((notif) =>({ ...notif, isRead: true } )))
      } catch (error) {
        console.log(error)
      } 
  }
  


  return (
    <div
        style={{ scrollbarWidth: "none" }}
        className="relative sm:max-h-[80vh] max-h-[70vh] max-w-[40vh] space-y-4  overflow-y-auto bg-black text-slate-300 rounded-xl  shadow-lg w-full  mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-2 scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
    >
        <div className="sticky top-0  bg-black  z-10 border-b border-gray-300 flex justify-between items-center gap-3 px-4 py-3">
            <h2 className="text-sm sm:text-xl font-semibold ">Notifications</h2>
            <button
              className="bg-white/90 hover:bg-white/30 text-slate-700 active:bg-gray-900 transition-colors rounded-lg hover:text-white py-1 px-3 text-sm sm:text-base font-semibold cursor-pointer"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
        </div>
        {
          initialLoading 
          ? 
          (
              <div className="flex justify-center items-center py-6">
                <LoaderCircle className="animate-spin text-blue-600 h-6 w-6" /> <span className="ml-2">Loading...</span>
              </div>
          )
           :
            notifications.length > 0
             ?
              (
                notifications.map((notification) => (
                <NotificationItem
                  key={notification._id + Math.random()} 
                  notification={notification} 
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
               ) 
               : 
               (
                  <div className="text-center text-gray-500 py-6">No new notifications</div>
                )
          }
          { loading &&
              (
                <div className="flex justify-center items-center py-4">
                  <LoaderCircle className="animate-spin text-blue-600 h-6 w-6" /> <span className="ml-2">Loading more...</span>
                </div>
          )}

          {
          (totalPages.current < pageRef.current && !loading)
           && 
           <div className="text-center text-sm">You're all caught</div>
          }
         <div ref={observerTarget} />
      </div>
 



 

  )
}