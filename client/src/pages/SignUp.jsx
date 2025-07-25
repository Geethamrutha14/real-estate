import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";



export default function SignUp() {
  const [formData , setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {

      setLoading(true);
    const res = await fetch('/api/auth/signup',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(formData)
    });

    const data = await res.json();

    if(data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in')
    console.log(data)
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }

    
  }

  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>

        <input type="text" placeholder='John Doe' id="username" className='border p-3 rounded-lg' onChange={handleChange}/>
        <input type="email" placeholder='johndoe@gmail.com' id="email" className='border p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder='password' id="password" className='border p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg
         text-white uppercase
         hover:opacity-90 disabled:hover:opacity-80'>

           { loading ? "...loading" : "Sign up"}

         </button>
         <OAuth/>
      </form>

      <div className="flex gap-2 mt-4">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className="underline text-blue-700" >SignIn</span>
        </Link>


      </div>

      {error && <p className="text-red-500 mt-2 text-sm"> {error} </p>}
    </div>
  )
}
