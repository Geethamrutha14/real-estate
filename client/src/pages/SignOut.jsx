import { Link } from "react-router-dom"

export default function SignOut() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form className='flex flex-col gap-5'>

        <input type="text" placeholder='John Doe' className='border p-3 rounded-lg'/>
        <input type="email" placeholder='johndoe@gmail.com' className='border p-3 rounded-lg'/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 p-3 rounded-lg
         text-white uppercase
         hover:opacity-90 disabled:hover:opacity-80'>sign up</button>
      </form>
      <div className="flex gap-2 mt-4">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className="underline text-blue-700">SignIn</span>
        </Link>
      </div>
    </div>
  )
}
