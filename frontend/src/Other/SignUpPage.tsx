import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function SignUpPage() {

const [username, setUsername] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [repeatPassword, setRepeatPassword] = useState<string>("");
const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
const [usernameInUse, setUsernameInUse] = useState<boolean>(false);
const [failedToCreate, setFailedToCreate] = useState<boolean>(false);

let navigate = useNavigate();

async function signup(username:string, password:string) {
    fetch("/signup", {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => {
        if(response.ok) {
            navigate("/user");
        }
    })
    .catch((err) => {
        if (err.statusCode === 400){
            setUsernameInUse(true);
            setFailedToCreate(true)
            //TODO: the two functions above should only be called if the error code that is returned means that they are true
        }
        console.log(err.message);
    })
}

return (
   <div className="flex items-center justify-center h-screen">
        <div>
            <div className="flex justify-center text-[#3e4b60]">
                <div className="bg-[#808287] text-[30px] text-white px-4 rounded-tl rounded-tr p-1 mr-2">
                    <NavLink to='/login'>Login</NavLink>
                </div>
                <div className="bg-[#D9D9D9] text-[30px] px-4 rounded-tl rounded-tr p-1">
                    <NavLink to='/signup'>Sign up</NavLink>
                </div>  
            </div>  
            <div className='bg-[#D9D9D9] text-[#3e4b60] rounded-sm py-2'>
                <div className="flex justify-center m-2">
                    <div className="px-4">Username:</div>
                    <input  
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter Username here" 
                        type="text" 
                        className="bg-[#808287] rounded-sm text-white p-1">
                    </input>
                </div>
                <div className="flex justify-center m-2">
                    <div className="px-4">Password:</div>
                    <input 
                        value={password}
                        onChange={e => {setPassword(e.target.value); setPasswordsMatch(e.target.value === repeatPassword);}}
                        placeholder="Enter Password here" 
                        type="text" 
                        className="bg-[#808287] rounded-sm text-white p-1">
                    </input>
                </div>
                <div className="flex justify-center m-2">
                    <div className="px-4">Repeat Password:</div>
                    <input 
                        value={repeatPassword}
                        onChange={e => {setRepeatPassword(e.target.value); setPasswordsMatch(password === e.target.value);}}
                        placeholder="Repeat Password here" 
                        type="text" 
                        className="bg-[#808287] rounded-sm text-white p-1"
                    ></input>
                </div>
                { !passwordsMatch &&
                    <div className='text-[#fc0000] text-xs text-center'> Passwords do not match !</div>
                }
                { usernameInUse &&
                    <div className='text-[#fc0000] text-xs text-center'> Username already exists</div>
                }
                { failedToCreate &&
                    <div className='text-[#fc0000] text-xs text-center'> Failed to create user</div>
                }
            </div>
             <div className='flex justify-center'>
                <NavLink to='/'>
                    <button className='bg-[#D9D9D9] hover:bg-[#808287] text-[#3e4b60] hover:text-white p-4 py-4 m-4 rounded-sm'>
                        Back to Main Page
                    </button>
                </NavLink>
                <NavLink to='/user'>
                    <button 
                        disabled= {username === "" || password === "" || repeatPassword === ""}
                        onClick= {()=> signup(username, password)} 
                        className= {(username === "" || password === "" || repeatPassword === "") ? "bg-[#808287] text-[#3e4b60] p-4 py-4 m-4 rounded-sm" :'bg-[#D9D9D9] hover:bg-[#808287] text-[#3e4b60] hover:text-white p-4 py-4 m-4 rounded-sm'}>
                        Sign Up
                    </button>
                </NavLink>
            </div>
            <div className='text-xs text-center'>
                Copyright © 2026 - present. Lamis McDowall-Rose 
            </div>
        </div>
    </div>
)
} export default SignUpPage;
