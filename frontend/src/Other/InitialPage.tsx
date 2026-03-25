import { NavLink } from 'react-router-dom'

function InitialPage() {
  return (
    <>
        <div className='h-9/10'>
            <header className='flex justify-center py-8'>
                <h1 className='w-4/5 text-center text-2xl'>Welcome to CanvasCollab !</h1>
            </header>
            <main className='flex flex-col justify-center'>
                <div className='flex justify-center'>
                    <div className='w-2/3 text-center'>
                        This is my personal project to get to understand web development better.
                        You can click on any of the canvases on display in the background to go check out what users are making
                        (probably just me tbh, this is just a personal project haha), or click on the login or sign up buttons 
                        if you want to make an account of your own to collab in, and create canvases.

                        There’s a more detailed README about the project here :)
                    </div>
                </div>
                <div className='flex justify-center'>
                    <NavLink to='/login'>
                        <button className='bg-[#D9D9D9] hover:bg-[#808287] text-[#3e4b60] hover:text-white p-4 py-4 m-4 rounded-sm'>
                            Login
                        </button>
                    </NavLink>
                    <NavLink to='/signup'>
                        <button className='bg-[#D9D9D9] hover:bg-[#808287] text-[#3e4b60] hover:text-white p-4 py-4 m-4 rounded-sm'>
                            Sign up
                        </button>
                    </NavLink>
                </div>
                <div className='text-xs text-center'>
                    Copyright © 2026 - present. Lamis McDowall-Rose 
                </div>
            </main>
        </div>
    </>
  )
}

export default InitialPage
