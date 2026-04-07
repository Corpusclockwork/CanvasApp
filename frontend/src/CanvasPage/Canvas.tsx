import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Scrollbar } from 'react-scrollbars-custom';
import { Tooltip } from 'react-tooltip'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCollaborators from '../UserPage/Modals/AddCollaborators';

import { type CanvasDetails, type BasicUserDetails } from "../Interfaces";

function Canvas() {
    const [canvasblob, setCanvasblob] = useState(new ArrayBuffer(1024*1024));
    const [canvasDetails, setCanvasDetails] = useState<CanvasDetails>({} as CanvasDetails);

    const [canvasOwner, setCanvasOwner] = useState<string>("");
    const [canvasCollaborators, setCanvasCollaborators] = useState<BasicUserDetails[]>([]);
    
    const canvasObjectId = useRef<HTMLCanvasElement>(null);
    const [leftDropdown, setLeftDropdown] = useState(false);
    const [rightDropdown, setRightDropdown] = useState(false);
    const [showAddCollaboratorsModal, setShowAddCollaboratorsModal] = useState(false);

    // const colorsList = ["black", "red", "green", "blue", "white"];

    // var imageData = new ImageData(new Uint8ClampedArray(canvasblob), 1024, 1024);
    // var ctx = canvasObjectId.getContext("2d");
    // ctx?.putImageData(imageData, 0, 0);

    async function getCollaboratorsForCanvas(canvasId: number) {
        fetch(`/canvasid=${canvasId}/canvascollaborators`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
            const userObjects = data.parse();
            userObjects.forEach((userObject: BasicUserDetails) => setCanvasCollaborators([...canvasCollaborators, userObject]));
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    async function getOwnerForCanvasName(canvasId: number) {
        fetch(`/canvasid=${canvasId}/canvasowner`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
            setCanvasOwner(data);
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    const setCanvasBlob = async () => {
        try {
            const response =  await (await fetch('/canvasblob/{id}')).json()
            setCanvasblob(response);
            console.log(canvasblob);
        } catch {

        }
    }

    async function getCanvasDetails(){
        fetch("/canvasId=1", {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
            const canvasObject = data.parse();
            setCanvasDetails({
                id: canvasObject.id,
                name: canvasObject.name,
                thumbnail: canvasObject.thumbnail,
                dateCreated: canvasObject.dateCreated,
                lastEdited: canvasObject.lastEdited,
                ownerId: canvasObject.ownerId,
                collaboratorIds: canvasObject.collaboratorIds
            })

            getCollaboratorsForCanvas(canvasDetails.id);
            getOwnerForCanvasName(canvasDetails.id);
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        getCanvasDetails();
        setCanvasBlob();
    }, [])
    
    return (
        <div>
            {!leftDropdown && 
                <div className='w-10 h-10 bg-gray-500 absolute rounded-br-lg z-2' onClick={()=> setLeftDropdown(!leftDropdown)}>
                    <p data-tooltip-id="left-open-tooltip" data-tooltip-content="Open dropdown" className='text-3xl text-center align-middle'>&#8617;</p>
                    <Tooltip id="left-open-tooltip">
                    </Tooltip>
                </div>
            }
            {leftDropdown && 
                <div className='w-auto h-auto mw-200 bg-gray-500 absolute rounded-br-lg z-2 p-2'>
                    <ul>
                        <li>
                            <p data-tooltip-id="left-close-tooltip" data-tooltip-content="Close dropdown" className='text-3xl max-w-fit' onClick={()=> setLeftDropdown(!leftDropdown)}>&#8689;</p>
                            <Tooltip id="left-close-tooltip">
                            </Tooltip>
                        </li>
                        <li className='hover:bg-gray-600 rounded-sm p-1'>
                            <NavLink to='/userdetails'>Back to your Canvases</NavLink>
                        </li>
                        <li className='hover:bg-gray-600 rounded-sm p-1'>
                            <NavLink to='/'>Sign Out</NavLink>
                        </li>
                        <li className='p-1'>
                            <div className='text-xs'>
                                Copyright © 2026 - present. Lamis McDowall-Rose 
                            </div>
                        </li>
                    </ul>
                </div>
            }
            <Scrollbar className='bg-white z-1 top-0 left-0' style={{width:"100vw", height:"100vh", maxWidth:1024, maxHeight:1024}}>
                <canvas ref={canvasObjectId} className='CanvasObject w-1024 h-1024'>
                </canvas>
            </Scrollbar>
            {!rightDropdown && 
                <div className='w-10 h-10  bg-gray-500 top-0 right-0 z-2 absolute rounded-bl-lg' onClick={()=> setRightDropdown(!rightDropdown)}>
                    <p data-tooltip-id="right-open-tooltip" data-tooltip-content="Open canvas options dropdown" className='text-3xl text-center align-middle'>&#8690;</p>
                    <Tooltip id="right-open-tooltip">
                    </Tooltip>
                </div>
            }
            {rightDropdown && 
                <div className='w-auto h-auto mw-200 bg-gray-500 top-0 right-0 z-2 absolute rounded-bl-lg p-2'>
                    <ul>
                        <li>
                            <p data-tooltip-id="right-close-tooltip" data-tooltip-content="Close dropdown" className='text-3xl max-w-fit' onClick={()=> setRightDropdown(!rightDropdown)}>&#8689;</p>
                            <Tooltip id="right-close-tooltip">
                            </Tooltip>
                        </li>
                        <li className='hover:bg-gray-600 rounded-sm p-1'>Colours</li>
                        <li className='hover:bg-gray-600 rounded-sm p-1'>
                            List of Collaborators
                            <ul>
                                {
                                    canvasCollaborators.map((canvasCollaborator, index) => (
                                        <li className={"hover:bg-gray-700 text-$["+ canvasCollaborator.colour + "]"} key={index}>
                                            {canvasCollaborator.username}
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                        <li className='hover:bg-gray-600 rounded-sm p-1'>Add a Collaborator <AddCircleOutlineIcon></AddCircleOutlineIcon></li>
                        <AddCollaborators
                            open={showAddCollaboratorsModal}
                            onClose={() => setShowAddCollaboratorsModal(false)}
                            canvasId={canvasDetails.id}
                        >
                            
                        </AddCollaborators>
                        <li className='hover:bg-gray-600 rounded-sm p-1'>Canvas owner
                            <div className="hover:bg-gray-700">
                                {canvasOwner}
                            </div>
                        </li>
                    </ul>
                </div>
            }

        </div>
    )
} export default Canvas;