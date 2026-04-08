// import { useState, useEffect } from 'react'
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AddCanvas from "./Modals/AddCanvas";
import DeleteCanvas from "./Modals/DeleteCanvas";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { type UserDetails, type CanvasDetails } from "../Interfaces";
import JoinCanvas from "./Modals/JoinCanvas";

function UserDetails() {

const [showAddCanvasModal, setShowAddCanvasModal] = useState<boolean>(false);
const [showJoinCanvasModal, setShowJoinCanvasModal] = useState<boolean>(false);
const [selectedCanvas, setSelectedCanvas] = useState<string>(""); // might/ will have the change the type at some point
const [showDeleteCanvasModal, setShowDeleteCanvasModal] = useState<boolean>(false);
const [toggleTab, setToggleTab] = useState<boolean>(false);

const [userDetails, setUserDetails] = useState<UserDetails>({} as UserDetails);
const [userOwnedCanvasDetails, setUserOwnedCanvasDetails] = useState<CanvasDetails[]>([]);
const [userCollabCanvasDetails, setUserCollabCanvasDetails] = useState<CanvasDetails[]>([]);


async function getUserOwnedCanvasDetails(userId: number){
     fetch(`/users/userId=${userId}/userownedcanvasdetails`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(response => response.json())
    .then(data => {
        const canvasObjects = data.parse();
        canvasObjects.forEach((canvasObject: CanvasDetails) => setUserOwnedCanvasDetails([...userOwnedCanvasDetails, canvasObject]));
    })
    .catch((err) => {
        console.log(err.message);
    })
}

async function getUserCollabCanvasDetails(userId: number){
     fetch(`/users/userId=${userId}/usercollabcanvasdetails`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(response => response.json())
    .then(data => {
        const canvasObjects = data.parse();
        canvasObjects.forEach((canvasObject: CanvasDetails) => setUserCollabCanvasDetails([...userCollabCanvasDetails, canvasObject]));
    })
    .catch((err) => {
        console.log(err.message);
    })
}

async function getUserDetails(userId: number) {
    fetch(`/users/userId=${userId}/userdetails`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(response => response.json())
    .then(data => {
        // don't use data until everything is hooked up
        setUserDetails({
            id: 23,
            name: "Test Username",
            colour: "#50d71e",
            ownedCanvasIds:[],
            collabCanvasIds: [],
        })
        getUserOwnedCanvasDetails(userDetails.id);
        getUserCollabCanvasDetails(userDetails.id);
    })
    .catch((err) => {
        console.log(err.message);
    })
}

async function postUserDetails(userId: number){
    fetch(`/users/userId=${userId}/userdetails`, {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => {
        if(response.ok) {
            console.log("success")
        }
    })
    .catch((err) => {
        console.log(err.message);
    })
}

function displayCanvasList(canvases: CanvasDetails[], canDeleteCanvases: boolean){
    return(
        <ul>
            {canvases.map(canvas => (
                <li> 
                    <img src={canvas.thumbnail}> </img>
                    {canDeleteCanvases &&
                        <div className='rounded-lg text-center bg-gray' onClick={()=> setShowDeleteCanvasModal(true)}>x</div>
                    }
                    <li> Date Created: {canvas.dateCreated.toDateString()} </li>
                    <li> Last Edited: {canvas.lastEdited.toDateString()}</li>
                </li>
            ))}
        </ul>
    )
}

function YourCanvasesTab(){
    if (!toggleTab) {
        return (
            <div className="p-2 flex">
                <AddCanvas
                    open={showAddCanvasModal}
                    onClose={() => setShowAddCanvasModal(false)}
                    username={userDetails.name}
                    userId={userDetails.id}
                >
                </AddCanvas>
                <DeleteCanvas 
                    showDeleteCanvasModal={showDeleteCanvasModal} 
                    canvasName={selectedCanvas}>
                </DeleteCanvas>
                <button className="flex"  onClick={()=> setShowAddCanvasModal(true)}>
                    <div className="p-2">Create a new canvas <AddCircleOutlineIcon></AddCircleOutlineIcon> </div>            
                </button>
                {displayCanvasList(userOwnedCanvasDetails, true)}
            </div>

        )
    } else {
        return ( 
            <div className="p-2 flex">
                <JoinCanvas
                    open={showJoinCanvasModal}
                    onClose={() => setShowJoinCanvasModal(false)}
                    username={userDetails.name}
                    userId={userDetails.id}
                    >
                </JoinCanvas>
                <button className="flex"  onClick={()=> setShowJoinCanvasModal(true)}>
                    <div className="p-2">Search for new canvases to join: <AddCircleOutlineIcon></AddCircleOutlineIcon> </div>            
                </button>
                {displayCanvasList(userCollabCanvasDetails, false)}
            </div>
        )
    }
}

useEffect(() => {
    getUserDetails(userDetails.id);
}, [userDetails]);

return (
    <div className="grid grid-cols-4 h-screen text-[#3e4b60]">
        <div className="col-span-1 bg-black">
            <div className="bg-[#D9D9D9] absolute rounded-br-lg absolute top-0 p-2">
                <NavLink to='/'>Logout &#8617; </NavLink>
            </div>
           <div className="rounded p-2 mt-20">
                <div>
                    <img className="self-center" style= {{clipPath: "circle(40%)", borderWidth: "5px", borderStyle: "solid", borderColor: userDetails.colour}} src="/image_placeholder.jpg">
                    </img>
                </div>
                <div className="text-center mt-5 text-white">
                    {userDetails.name}
                </div>
                <div className={"text-center mt-5 text-[" + userDetails.colour + "]"}>
                    Usercolour
                    <EditSquareIcon onClick={() => postUserDetails(userDetails.id)}></EditSquareIcon>
                </div>
                 <div className=' absolute text-xs text-center text-white bottom-0 w-1/4 pr-2 pb-2'>
                    Copyright © 2026 - present. Lamis McDowall-Rose 
                </div>
            </div>
        </div>
        <div className="col-span-3">
            <div className=" flex">
                <div className={`${toggleTab ? 'bg-[#808287] text-white' : 'bg-[#D9D9D9]'}` +' w-1/2 p-5 rounded-t-lg'} onClick={()=> setToggleTab(false)}>
                    <h2>Your Canvases</h2> 
                </div>
                <div className={`${toggleTab ? 'bg-[#D9D9D9]' : 'bg-[#808287] text-white'}` +' w-1/2 p-5 rounded-t-lg'} onClick={()=> setToggleTab(true)}>
                    <h2>Canvases you are a collaborator on</h2>
                </div>
            </div>
            <div className="bg-[#D9D9D9]">
                {YourCanvasesTab()}
            </div>
        </div>
    </div>
)
} export default UserDetails;
