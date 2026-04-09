import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { Scrollbar } from 'react-scrollbars-custom';
import { Tooltip } from 'react-tooltip'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCollaborators from '../UserPage/Modals/AddCollaborators';

import { type CanvasDetails, type BasicUserDetails, type UserDetails } from "../Interfaces";
import Sketch from '@uiw/react-color-sketch';

function Canvas() {
    const [userDetails, setUserDetails] = useState<UserDetails>({} as UserDetails);
    // const [canvasBlob, setCanvasBlob] = useState(new ArrayBuffer(1024*1024));
    const [canvasDetails, setCanvasDetails] = useState<CanvasDetails>({} as CanvasDetails);

    const [canvasOwner, setCanvasOwner] = useState<string>("");
    const [canvasCollaborators, setCanvasCollaborators] = useState<BasicUserDetails[]>([]);
    
    const [leftDropdown, setLeftDropdown] = useState<boolean>(false);
    const [rightDropdown, setRightDropdown] = useState<boolean>(false);
    const [showAddCollaboratorsModal, setShowAddCollaboratorsModal] = useState<boolean>(false);

    const [brushColour, setBrushColour]= useState<string>("#c0392b");
    const [previousMousePosition, setPreviousMousePosition] = useState<[number, number]>([0,0]);
    const [mousePosition, setMousePosition] = useState<[number, number]>([0,0]);
    const [canvasBlobUrl, setCanvasBlobUrl] = useState(`/canvasblob/${canvasDetails.id}`);

    const canvasRef  = useRef<HTMLCanvasElement>(null);
    const ctx = canvasRef.current === null ? null: canvasRef.current.getContext('2d');
    
    
    async function getCollaboratorsForCanvas(canvasId: number) {
        fetch(`/canvases/canvasid=${canvasId}/canvascollaborators`, {
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
            // console.log(err.message);
        })
    }

    async function getOwnerForCanvasName(canvasId: number) {
        fetch(`/canvases/canvasid=${canvasId}/canvasowner`, {
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
            // console.log(err.message);
        })
    }

    const getCanvasBlob = async () => {
        try {
            const response =  await (await fetch(`/canvasblob/${canvasDetails.id}`)).json()
            // setCanvasBlob(response);
            // console.log(canvasBlob);
        } catch {

        }
    }

    async function getCanvasDetails(){
        fetch(`/canvases/canvasId=${canvasDetails.id}`, {
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
            // console.log(err.message);
        })
    }

    function getCanvasPosition(eventX: number, eventY: number) {
        var rect = canvasRef.current === null ? null: canvasRef.current.getBoundingClientRect();
        return [eventX - rect!.left, eventY - rect!.top] as [number, number];
    }

    function draw(event : MouseEvent) {
        if (event.buttons !== 1) {
            setMousePosition([event.clientX, event.clientY]);
            setPreviousMousePosition(mousePosition);
            return; 
        }
        
        if(ctx){
            ctx.beginPath(); 

            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = `${brushColour}`;

            ctx.moveTo(previousMousePosition[0], previousMousePosition[1]);
            setMousePosition([event.clientX, event.clientY]);
            ctx.lineTo(mousePosition[0], mousePosition[1]); 
            setPreviousMousePosition(mousePosition);

            ctx.stroke(); 
        }
    }

    useEffect(() => {
        // getCanvasDetails();
        // getCanvasBlob();
        // const connection = createConnection(userDetails.id, canvasDetails.id);
        // const connection ;
        // connection.connect();
        // return () => {
        //     connection.disconnect();
        // }
        //TODO: const imageData = context.getImageData(0, 0, 1, 1); for the thumbnail 
        
    }, [mousePosition, brushColour])
    
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
                <canvas 
                    ref={canvasRef}
                    style={{width:"1024px", height:"1024px"}}
                    onMouseMove={(e)=> draw(e)}
                    onMouseDown={(e)=> {
                        const mouse : [number, number] = getCanvasPosition(mousePosition[0], mousePosition[1])
                        setPreviousMousePosition(mouse); 
                        setMousePosition([e.clientX, e.clientY]);
                    }}
                    onMouseEnter={(e)=> {
                        setPreviousMousePosition([mousePosition[0], mousePosition[1]]); 
                        setMousePosition([e.clientX, e.clientY]);
                    }}
                >
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
                        <li className='rounded-sm p-1'>
                            Colours
                            <Sketch
                                color={brushColour}
                                onChange={(color) => {setBrushColour(color.hex);}}
                            />

                        </li>
                        <li className='hover:bg-gray-600 rounded-sm p-1'>
                            List of Collaborators
                            <ul>
                                {
                                    canvasCollaborators.map((canvasCollaborator, index) => (
                                        <li className={"hover:bg-gray-700 text-["+ canvasCollaborator.colour + "]"} key={index}>
                                            {canvasCollaborator.username}
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                        <li className='hover:bg-gray-600 rounded-sm p-1' onClick={()=> setShowAddCollaboratorsModal(true)}>Add a Collaborator <AddCircleOutlineIcon></AddCircleOutlineIcon></li>
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