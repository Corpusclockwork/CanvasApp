import { useState, useEffect, useRef } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';


function Canvas() {
    const [canvasblob, setCanvasblob] = useState(new ArrayBuffer(1024*1024));
    const canvasObjectId = useRef<HTMLCanvasElement>(null);
    const [leftDropdown, setLeftDropdown] = useState(false);
    const [rightDropdown, setRightDropdown] = useState(false);
    // const colorsList = ["black", "red", "green", "blue", "white"];

    // var imageData = new ImageData(new Uint8ClampedArray(canvasblob), 1024, 1024);
    // var ctx = canvasObjectId.getContext("2d");
    // ctx?.putImageData(imageData, 0, 0);

    

    const setCanvasBlob = async () => {
        try {
            const response =  await (await fetch('/canvasblob/{id}')).json()
            setCanvasblob(response);
            console.log(canvasblob);
        } catch {

        }
    }

    useEffect(() => {
        setCanvasBlob()
    }, [])
    
    return (
        <div>
            {!leftDropdown && 
                <div className='w-10 h-10 bg-gray-500 absolute rounded-br-lg z-2' onClick={()=> setLeftDropdown(!leftDropdown)}>
                    <p className='text-3xl text-center align-middle'>&#8617;</p>
                </div>
            }
            {leftDropdown && 
                <div className='w-100 h-auto mw-200 bg-gray-500 absolute rounded-br-lg z-2'>
                    <ul>
                        <li>
                            <p onClick={()=> setLeftDropdown(!leftDropdown)}>&#8689;</p>
                        </li>
                        <li>Back to your Canvases</li>
                        <li>Sign Out</li>
                        <li>
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
                    <p className='text-3xl text-center align-middle'>&#8690;</p>
                </div>
            }
            {rightDropdown && 
                <div className='w-100 h-auto mw-200 bg-gray-500 top-0 right-0 z-2 absolute rounded-bl-lg'>
                    <p onClick={()=> setRightDropdown(!rightDropdown)}>&#8689;</p>
                    Colours
                    List of Collaborators
                    Add a Collaborator
                </div>
            }

        </div>
    )
} export default Canvas;