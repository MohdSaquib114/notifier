import NotificationIcon from "./NotificationIcon"



export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 p-4 shadow-lg z-50 bg-black border-b border-white/20 text-slate-200">
    <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
    
      <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white">Notifier</h1>
  
        <NotificationIcon />
    
    </div>
  </nav>
  
  )
}

