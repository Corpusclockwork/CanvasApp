type DeleteCanvasProps = {

    showDeleteCanvasModal: boolean,
    canvasName: string
}

function DeleteCanvas ({showDeleteCanvasModal, canvasName}: DeleteCanvasProps) {

return (
    <>
    {showDeleteCanvasModal && 
        <div className='top-1 left-0 w-screen h-screen bg-opacity-50 bg-gray-500'>
            <div className='bg-[#0E1F40] w-auto h-auto p-3 max-w-1/2 max-h-1/2'>
                <h1>Delete Canvas</h1>
                <div>You are about to delete <div>{canvasName}</div>, are you sure ?</div>
                <button>Yes</button>
                <button>No</button>
            </div>  
        </div>
    }
    </>
)
} export default DeleteCanvas;