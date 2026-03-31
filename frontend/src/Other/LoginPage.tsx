import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function LoginPage() {

const [username, setUsername] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [incorrectDetails , setIncorrectDetails] = useState<boolean>(false);

let navigate = useNavigate();

async function login(username:string, password:string) {
    fetch("/login", {
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
            setIncorrectDetails(true);
        }
        console.log(err.message);
    })
}

return (
    <div className="flex items-center justify-center h-screen">
        <div>
            <div className="flex justify-center text-[#3e4b60]">
                <div className="bg-[#D9D9D9] text-[30px] px-4 rounded-tl rounded-tr p-1 mr-2">
                    <NavLink to='/login'>Login</NavLink>
                </div>
                <div className="bg-[#808287] text-white text-[30px] px-4 rounded-tl rounded-tr p-1">
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
                        className="bg-[#808287] rounded-sm text-white p-1"
                    ></input>
                </div>
                <div className="flex justify-center m-2">
                    <div className="px-4">Password:</div>
                    <input 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter Password here"
                        type="text"
                        className="bg-[#808287] rounded-sm text-white p-1"
                    ></input>
                </div>
                { incorrectDetails &&
                    <div className='text-[#fc0000] text-xs text-center'> Username or password is incorrect</div>
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
                        disabled={username === "" || password === ""}
                        onClick={()=> login(username, password)} 
                        className={(username === "" || password === "") ? "bg-[#808287] text-[#3e4b60] p-4 py-4 m-4 rounded-sm" :'bg-[#D9D9D9] hover:bg-[#808287] text-[#3e4b60] hover:text-white p-4 py-4 m-4 rounded-sm'}
                    >
                        Login
                    </button>
                </NavLink>
            </div>
            <div className='text-xs text-center'>
                Copyright © 2026 - present. Lamis McDowall-Rose 
            </div>
        </div>
    </div>
)
} export default LoginPage;
