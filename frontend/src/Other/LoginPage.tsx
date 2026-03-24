// import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

function LoginPage() {

// const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");
// const [loginToggle, setLoginToggle] = useState(true);

return (
    <div className="flex items-center justify-center h-screen">
        <div>
            <div className="flex justify-center">
                <div className="bg-[#D9D9D9] text-black text-[30px] px-4 mx-4">
                    <NavLink to='/login'>Login</NavLink>
                </div>
                <div className="bg-[#D9D9D9] text-[30px] px-4 mx-4">
                    <NavLink to='/signup'>Sign up</NavLink>
                </div>  
            </div>  
            <div>
                <div className="flex justify-center">
                    <div className="px-4">Username:</div>
                    <div className="bg-grey">Enter Username here</div>
                </div>
                <div className="flex justify-center">
                    <div className="px-4">Password:</div>
                    <div className="bg-grey"> Enter Password here</div>
                </div>
            </div>
            <div className="flex justify-center">
                <NavLink to='/user'>Login</NavLink>
            </div>
            <div className="flex justify-center">
                <NavLink to='/'>Back to Main Page</NavLink>
            </div>
            <div className='text-xs text-center'>
                Copyright © 2026 - present. Lamis McDowall-Rose 
            </div>
        </div>
    </div>
)
} export default LoginPage;
