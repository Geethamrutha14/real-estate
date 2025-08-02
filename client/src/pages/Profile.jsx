import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className="p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      
      <form className="flex flex-col gap-4 max-w-lg mx-auto">
        <img src={currentUser.avatar} alt="profile" className="self-center rounded-full h-24 w-24 mb-4 object-cover cursor-pointer"/>
        <input type="text" placeholder="johndoe" className="p-3 rounded-lg border " id="username"/>
        <input type="email" placeholder="johndoe@gmail.com" className="p-3 rounded-lg border " id="email"/>
        <input type="password" placeholder="password" className="p-3 rounded-lg border " id="password"/>
        <button 
        className="bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:hover:80">
          update
          </button>
           <div className="flex justify-between">
              <span className="text-red-700">Delete Account</span>
              <span className="text-red-700">Sign out</span>
          </div>
      </form>
     
    </div>
  )
}
