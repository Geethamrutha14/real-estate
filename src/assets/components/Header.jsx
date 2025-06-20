import React from 'react'

export default function Header() {
  return (
    <div>
      {/* in header we will have a name , logo search bar   */}
      <header className='bg-slate-200 shadow-md'>

       <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
         <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500' >Real</span>
        <span className='text-slate-700'>Estate</span>

      </h1>
      <form className='bg-slate-100 rounded-lg'>
        <input type="text" placeholder='Search...' className='rounded-md bg-slate-100 outline-none p-2'/>
      </form>
       </div>


      </header>
    </div>
  )
}
