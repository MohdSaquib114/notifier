
import NavBar from "./components/NavBar"
const posts = [
  {
    id: 1,
    name: "John Doe",
    profileUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    content: "Had an amazing time exploring the city today! 🏙️✨",
    time: "2 hours ago",
    postUrl: "https://images.unsplash.com/photo-1740165886179-c2be3d6447ca?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Emma Smith",
    profileUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    content: "Just finished a great book! Highly recommend 'Atomic Habits' 📖💡",
    postUrl: "https://images.unsplash.com/photo-1739992103066-cd16de07e728?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "5 hours ago",
  },
  {
    id: 3,
    name: "Michael Johnson",
    profileUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    content: "Enjoying my weekend with some good coffee and coding! ☕💻",
    time: "1 day ago",
    postUrl: "https://images.unsplash.com/photo-1739999373818-ab59c32b23c1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Sophia Williams",
    profileUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    content: "Nature is so beautiful! 🌿🌸 Just went on a refreshing hike! 🥾",
    time: "2 days ago",
    postUrl: "https://images.unsplash.com/photo-1740021546242-8b718a3e0459?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "David Brown",
    profileUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    content: "Excited for the weekend! Planning a movie night 🍿🎬",
    postUrl: "https://images.unsplash.com/photo-1740021578918-692634d0d838?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "3 days ago",
  },
];








export default function App() {

    return (
      <main className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <NavBar />
    
      {/* Content Section */}
      <div className="container mx-auto flex justify-center items-center min-h-[80vh] p-4 flex-col mt-20 gap-10 ">
        {
          posts.map(post=>
            <div key={post.id} className="border border-white sm:w-[50vh] p-5 rounded-lg space-y-5">
                 <div className="flex items-center gap-2">
                  <img className="w-[50px] rounded-full" src={post.profileUrl} alt="profile-img" />
                  <p>{post.name}</p>
                  <p className="text-xs text-slate-300">{post.time}</p>
                 </div>
                 <p>{post.content}</p>
                 <img className="rounded-lg w-[400px] h-[400px]" src={post.postUrl} alt="" />
            </div>
          )
        }

      </div>
    </main>
    
    )
 
}
