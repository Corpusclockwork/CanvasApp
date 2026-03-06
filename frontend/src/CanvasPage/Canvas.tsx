import { useState, useEffect } from 'react'

function Canvas() {
    const [canvasblob, setCanvasblob] = useState(new ArrayBuffer);
    const getCanvasBlob = async () => {
        try {
            const response =  await (await fetch('/canvasblob/{id}')).json()
            setCanvasblob(response);
            console.log(canvasblob);
        } catch {

        }
    }

    const setCanvasBlob = async () => {
        try {
            const response =  await (await fetch('/canvasblob/{id}')).json()
            setCanvasblob(response);
        } catch {

        }
    }

    useEffect(() => {
        getCanvasBlob()
    }, [])

    return (
        <>
        <div 
            onClick={()=> setCanvasBlob}>
        </div>
        </>
    )
} export default Canvas;