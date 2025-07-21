import { useSelector } from 'react-redux'
export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  return (
     <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <img src={currentUser.avatar} alt="profile" className='rounded-full self-center h-24 w-24 object-cover cursor-pointer mt-2'/>
      <form className='flex flex-col gap-4 '>
        <input type="text" placeholder='username' id='username'
         className='border p-3 rounded-lg'/>
        <input type="email" placeholder='email' id='email'className='border p-3 rounded-lg'/>
        <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 rounded-lg text-white uppercase p-3 hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700'>Delete account</span>
        <span className='text-green-700'>Sign out</span>
      </div>
    </div>
  )
}
