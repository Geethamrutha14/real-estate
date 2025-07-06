import React from 'react'
import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
export default function Header() {
  return (
    <div>
      {/* in header we will have a name , logo search bar and sign-up (home , about (optional)) */}
      <header className='bg-slate-200 shadow-md'>

       <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        
        {/* Logo */}
        <Link to='/'>
         <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500' >Real</span>
        <span className='text-slate-700'>Estate</span>
      </h1>
      </Link>

       {/* search bar  */}
      <form className='bg-slate-100 rounded-lg p-3 flex items-center justify-center'>
        <input type="text" placeholder='Search...' className='w-24 sm:w-64 bg-transparent focus:outline-none'/>
        <FaSearch className='text-slate-600'/>
      </form>

       {/* home , about , sign-in */}

      <ul className='flex gap-4'>

        <Link to='/'>
        <li className='text-slate-700 hover:underline hidden sm:inline'>HOME</li>
        </Link>

        <Link to='about'>
        <li className='text-slate-700 hover:underline hidden sm:inline'>ABOUT</li>
        </Link>

        <Link to='sign-in'>
        <li className='text-slate-700 hover:underline hidden sm:inline'>SIGN-IN</li>
        </Link>
       </ul>
       </div>

      </header>
    </div>
  )
}
