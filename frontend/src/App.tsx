import InitialPage from './Other/InitialPage'
import LoginPage from './Other/LoginPage'
import SignUpPage from './Other/SignUpPage'
import Canvas from './CanvasPage/Canvas'
import UserDetails from './UserPage/UserDetails'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
        <div className='min-h-screen pb-12' style={{backgroundColor: '#0E1F40', color:'white'}} >
            <Router>
                <Routes>
                    <Route path="/" element={<InitialPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/signup" element={<SignUpPage/>} />
                    <Route path="/user" element={<UserDetails/>} />
                    <Route path="/canvas" element={<Canvas/>} />
                </Routes>
            </Router>
        </div>
        <footer className='fixed inset-x-0 bottom-0 p-4' style={{backgroundColor: "lightblue"}}>
            Copyright © 2026 - present. Lamis McDowall-Rose 
        </footer>
    </>
  )
}

export default App
