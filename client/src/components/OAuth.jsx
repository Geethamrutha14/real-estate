import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async ()=>{
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);
           
           
            const res = await fetch('api/auth/google',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : 'include',
                body : JSON.stringify({
                    name : result.user.displayName,
                    email : result.user.email,
                    photo : result.user.photoURL
                })
            });
            const data = await res.json();
            
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log('cannot continue...',error.message);
        }
    }
  return (
    <button type='button' className='p-3 bg-red-700 text-white rounded-lg uppercase hover:opacity-95
      disabled:opacity-80' 
      onClick={handleGoogleClick}>
      continue with google
    </button>
  )
}
