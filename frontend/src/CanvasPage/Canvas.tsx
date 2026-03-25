import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Scrollbar } from 'react-scrollbars-custom';
import { Tooltip } from 'react-tooltip'


function Canvas() {
    const [canvasblob, setCanvasblob] = useState(new ArrayBuffer(1024*1024));
    const [canvasCollaborators, setCanvasCollaborators] = useState([]);
    const [canvasOwner, setCanvasOwner] = useState("");
    const canvasObjectId = useRef<HTMLCanvasElement>(null);
    const [leftDropdown, setLeftDropdown] = useState(false);
    const [rightDropdown, setRightDropdown] = useState(false);
    // const colorsList = ["black", "red", "green", "blue", "white"];

    // var imageData = new ImageData(new Uint8ClampedArray(canvasblob), 1024, 1024);
    // var ctx = canvasObjectId.getContext("2d");
    // ctx?.putImageData(imageData, 0, 0);

   const getCollaborators = async () => {
         try {
            const response =  await (await fetch('/canvas/details/collaborators')).json()
            setCanvasCollaborators(response);
            console.log(canvasblob);
        } catch {

        }
    }

    const getCanvasOwner = async () => {
         try {
            const response =  await (await fetch('/canvas/details/owner')).json()
            setCanvasOwner(response);
            console.log(canvasblob);
        } catch {

        }
    }

    const setCanvasBlob = async () => {
        try {
            const response =  await (await fetch('/canvasblob/{id}')).json()
            setCanvasblob(response);
            console.log(canvasblob);
        } catch {

        }
    }

    useEffect(() => {
        setCanvasBlob();
        getCollaborators();
        getCanvasOwner();
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
                                        <li className="hover:bg-gray-700" key={index}>
                                            {canvasCollaborator}
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                        <li className='hover:bg-gray-600 rounded-sm p-1'>Add a Collaborator <div className='rounded-lg text-center bg-gray'>+</div></li>
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