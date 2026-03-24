import { NavLink } from 'react-router-dom'

function InitialPage() {
  return (
    <>
        <div className='h-9/10'>
            <header className='flex justify-center py-8'>
                <div className='w-4/5 text-center'>Welcome to CanvasCollab !</div>
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
                    <button className='bg-[#D9D9D9] p-4 py-4 m-4'>
                        <NavLink to='/login'>Login</NavLink>
                    </button>
                    <button className='bg-[#D9D9D9] p-4 py-4 m-4'>
                        <NavLink to='/signup'>Sign up</NavLink>
                    </button>
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
