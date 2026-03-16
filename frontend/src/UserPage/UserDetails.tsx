// import { useState, useEffect } from 'react'
import { useEffect, useState } from "react";
import "./UserDetails.css";
import { NavLink } from "react-router-dom";
function UserDetails() {

interface UserDetails {
    username: String;
    userCanvases: Canvas[];
    recentCanvasesView: Canvas[];
    recentCanvasesEdit: Canvas[];
}

interface Canvas {
    name: string;
    thumbnail: string;
    dateCreated: Date;
    lastEdited: Date;
    collaborators: [];
}

const [toggleTab, setToggleTab] = useState<boolean>(false);
const [userDetails, setUserDetails] = useState<UserDetails>(
    {
        username: "",
        userCanvases:[],
        recentCanvasesEdit: [],
        recentCanvasesView:[]
    }
);

useEffect(() =>{
    fetch("/userDetails/user=1")
    .then((response)=> response.json())
    .then((data) => setUserDetails(data))
});

function displayCanvasList(canvases: Canvas[]){
    return(
        <>
            {canvases.map(canvas => (
                <div> 
                    <img src={canvas.thumbnail}> </img>
                    <div> Date Created: {canvas.dateCreated.toDateString()} </div>
                    <div> Last Edited: {canvas.lastEdited.toDateString()}</div>
                    <div> Collaborators: {canvas.collaborators}</div>
                </div>
            ))}
        </>
    )
}

function YourCanvasesTab(){
    if (!toggleTab) {
        return (
            <>
                <div>
                    Create a new canvas
                </div>
                <div>
                    Your Recent Canvases
                    {displayCanvasList(userDetails.userCanvases)}
                </div>
            </>
        )
    } else {
        return ( 
            <>
                <div>
                    <div> View and Edit</div>
                    {displayCanvasList(userDetails.recentCanvasesView)}

                </div>
                <div>
                    <div> View Only </div>
                    {displayCanvasList(userDetails.recentCanvasesEdit)}
                </div>
            </>
        )
    }
}

return (
    <div className="grid grid-cols-4 h-screen">
        <div className="col-span-1 grid">
            <div className="absolute top-0">
                <NavLink to='/'>Logout</NavLink>
            </div>
           <div className="grid place-self-center">
                <div className="userPictureContainer place-self-center flex grid aspect-square rounded-full">
                    <img className="userPicture self-center justify-self-center aspect-square rounded-full"src="/image_placeholder.jpg">
                    </img>
                </div>
                <div className="usernameText text-center">
                    Username Placeholder 
                </div>
            </div>
        </div>
        <div className="col-span-3">
            <div className=" flex tabHeaders">
                <div className="grow-1" onClick={()=> setToggleTab(false)}>
                    Your Canvases
                </div>
                <div className="grow-1" onClick={()=> setToggleTab(true)}>
                    Your Recent Canvases
                </div>
            </div>
            <div className="tabBody">
               {YourCanvasesTab()}
            </div>
        </div>
    </div>
)
} export default UserDetails;
