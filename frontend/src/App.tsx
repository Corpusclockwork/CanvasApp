import './App.css'
import InitialPage from './Other/InitialPage'
import LoginPage from './Other/LoginPage'
import SignUpPage from './Other/SignUpPage'
import Canvas from './CanvasPage/Canvas'
import UserDetails from './UserPage/UserDetails'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<InitialPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/signup" element={<SignUpPage/>} />
                <Route path="/user" element={<UserDetails/>} />
                <Route path="/canvas" element={<Canvas/>} />
            </Routes>
        </Router>
    </>
  )
}

export default App
