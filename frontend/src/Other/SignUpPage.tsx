// import { useState, useEffect } from 'react'

import { NavLink } from "react-router-dom";
import './LoginPageSignInPage.css';

function SignUpPage() {

// const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");
// const [loginToggle, setLoginToggle] = useState(true);

return (
   <div className="flex items-center justify-center h-screen">
        <div>
            <div className="titleTextContainer flex justify-center">
                <div className="inactiveLoginSignUpTitle text-[30px] px-4 mx-4">
                    <NavLink to='/login'>Login</NavLink>
                </div>
                <div className="activeLoginSignUpTitle text-[30px] px-4 mx-4">
                    <NavLink to='/signup'>Sign up</NavLink> 
                </div> 
            </div>  
            <div className="mainTextContainer">
                <div className="usernameContainer flex justify-center">
                    <div className="usernameTextBox px-4">Username:</div>
                    <div className="enterUsernameBox">Enter Username here</div>
                </div>
                <div className="passwordContainer flex justify-center">
                    <div className="passwordTextBox px-4">Password:</div>
                    <div className="enterPasswordBox"> Enter Password here</div>
                </div>
                <div className="passwordContainer flex justify-center">
                    <div className="passwordTextBox px-4">Repeat Password:</div>
                    <div className="enterPasswordBox"> Enter Password again here</div>
                </div>
            </div>
            <div className="flex justify-center">
                <NavLink to='/user'>Login</NavLink>
            </div>
            <div className="flex justify-center">
                <NavLink to='/'>Back to Main Page</NavLink>
            </div>
        </div>
    </div>
)
} export default SignUpPage;
