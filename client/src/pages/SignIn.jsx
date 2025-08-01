import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData , setFormData] = useState({});
  const {loading , error} = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success == false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto text-center'>
      <h1 className='text-3xl font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <input type="email" id='email'
        placeholder='johndoe@gmail.com'
         className='border p-3 rounded-lg'
         onChange={handleChange}/>
        <input type="password" id='password' placeholder='password'className='border p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:hover:opacity-80'>
          {loading ? "Loading..." : "Sign-In"}
        </button>
      </form>

      <div className="flex gap-2 mt-4">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
        <span className="underline text-blue-700" >SignUp</span>
        </Link>

      </div>

      {error ? <p className='text-red-700'>{error}</p> : ""}

    </div>
  )
}