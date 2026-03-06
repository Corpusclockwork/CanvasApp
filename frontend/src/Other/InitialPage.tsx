import { NavLink } from 'react-router-dom'

function InitialPage() {
  return (
    <>
        <header>
            <div>Welcome to CanvasCollab !</div>
        </header>
        <main className="main-content">
            <div>
                This is my personal project to get to understand web development better.
                You can click on any of the canvases on display in the background to go check out what users are making
                (probably just me tbh, this is just a personal project haha), or click on the login or sign up buttons 
                if you want to make an account of your own to collab in, and create canvases.

                There’s a more detailed README about the project here :)
            </div>
            <button>
                <NavLink to="/login">Login</NavLink>
            </button>
            <button>
                <NavLink to="/signup">Sign up</NavLink>
            </button>
        </main>
        <footer className="app-footer">
        Copyright © 2026 - present. Lamis McDowall-Rose 
        </footer>
    </>
  )
}

export default InitialPage
