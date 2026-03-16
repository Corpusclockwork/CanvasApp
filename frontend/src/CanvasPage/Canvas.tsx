import { useState, useEffect, useRef } from 'react'
import "./Canvas.css";

function Canvas() {
    const [canvasblob, setCanvasblob] = useState(new ArrayBuffer(1024*1024));
    const canvasObjectId = useRef<HTMLCanvasElement>(null);
    const colorsList = ["black", "red", "green", "blue", "white"];

    var imageData = new ImageData(new Uint8ClampedArray(canvasblob), 1024, 1024);
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
        <>
            <div onClick={()=> setCanvasBlob}>
                <canvas ref={canvasObjectId} className='CanvasObject'>

                </canvas>
            </div>
        </>
    )
} export default Canvas;