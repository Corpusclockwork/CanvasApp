// import { useState, useEffect } from 'react'
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AddCanvas from "./Modals/AddCanvas";
import DeleteCanvas from "./Modals/DeleteCanvas";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export interface UserDetails {
    username: string;
    userCanvases: CanvasDetails[];
    sharedCanavases: CanvasDetails[];
}

export interface CanvasDetails {
    canvasName: string;
    thumbnail: string;
    dateCreated: Date;
    lastEdited: Date;
    collaborators: CollaboratorDetails[];
}

export interface CollaboratorDetails {
    username: string;
    colour: string
}

function UserDetails() {

const [showAddCanvasModal, setShowAddCanvasModal] = useState<boolean>(false);
const [selectedCanvas, setSelectedCanvas] = useState<string>(""); // might/ will have the change the type at some point
const [showDeleteCanvasModal, setShowDeleteCanvasModal] = useState<boolean>(false);
const [toggleTab, setToggleTab] = useState<boolean>(false);
const [userDetails, setUserDetails] = useState<UserDetails>(
    {
        username: "",
        userCanvases:[],
        sharedCanavases: [],
    }
);

useEffect(() =>{
    fetch("/userDetails/user=1")
    .then((response)=> response.json())
    .then((data) => setUserDetails(data))
});

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
            <>
                <button className="flex"  onClick={()=> setShowAddCanvasModal(true)}>
                    <div className="p-2">Create a new canvas <AddCircleOutlineIcon></AddCircleOutlineIcon> </div>            
                </button>
                <AddCanvas
                    open={showAddCanvasModal}
                    onClose={() => setShowAddCanvasModal(false)}
                    username={userDetails.username}
                >
                </AddCanvas>
                <DeleteCanvas 
                    showDeleteCanvasModal={showDeleteCanvasModal} 
                    canvasName={selectedCanvas}>
                </DeleteCanvas>
                <div className="p-2">
                    Your Recent Canvases
                    {displayCanvasList(userDetails.userCanvases, true)}
                </div>
            </>
        )
    } else {
        return ( 
            <div className="p-2 flex">
                <div className="pr-4 py-1">Search for new canvases to join: </div>
                <div>
                    <input  placeholder="Enter CanvasDetails Name here" type="text" className="bg-[#808287] rounded-sm text-white p-1"></input>
                </div>
                {displayCanvasList(userDetails.sharedCanavases, false)}
            </div>
        )
    }
}

return (
    <div className="grid grid-cols-4 h-screen text-[#3e4b60]">
        <div className="col-span-1 bg-black">
            <div className="bg-[#D9D9D9] absolute rounded-br-lg absolute top-0 p-2">
                <NavLink to='/'>Logout &#8617; </NavLink>
            </div>
           <div className="rounded p-2 mt-20">
                <div>
                    <img className="self-center" style= {{clipPath: "circle(40%)"}} src="/image_placeholder.jpg">
                    </img>
                </div>
                <div className="text-center mt-5 text-white">
                    Username Placeholder 
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
