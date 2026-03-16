import { NavLink } from 'react-router-dom'
import './InitialPage.css';

function InitialPage() {
  return (
    <>
        <div className='pageContent'>
            <header className='flex justify-center py-8'>
                <div className='headerText text-center'>Welcome to CanvasCollab !</div>
            </header>
            <main className='flex flex-col justify-center'>
                <div className='flex justify-center'>
                    <div className='mainText text-center'>
                        This is my personal project to get to understand web development better.
                        You can click on any of the canvases on display in the background to go check out what users are making
                        (probably just me tbh, this is just a personal project haha), or click on the login or sign up buttons 
                        if you want to make an account of your own to collab in, and create canvases.

                        There’s a more detailed README about the project here :)
                    </div>
                </div>
                <div className='buttons flex justify-center'>
                    <button className='loginButton p-4 py-4 m-4'>
                        <NavLink to='/login'>Login</NavLink>
                    </button>
                    <button className='loginButton p-4 py-4 m-4'>
                        <NavLink to='/signup'>Sign up</NavLink>
                    </button>
                </div>
            </main>
        </div>

    </>
  )
}

export default InitialPage
