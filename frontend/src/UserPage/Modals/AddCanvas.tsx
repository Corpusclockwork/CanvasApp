import { useState } from 'react';
import AddCollaborators from './AddCollaborators';

type AddCanvasProps = {
    username: String,
    showAddCanvasModal: boolean,
    showAddCollaboratorsModal: boolean
}
function AddCanvas ({showAddCanvasModal, username, showAddCollaboratorsModal }: AddCanvasProps) {

const [canvasCollaborators, setCanvasCollaborators] = useState([]);

return (
    <>
    {showAddCanvasModal && 
    <div className='top-1 left-0 w-screen h-screen bg-opacity-50 bg-gray-500'>
        <div className='bg-[#0E1F40] w-auto h-auto p-3 max-w-1/2 max-h-1/2'>
            <h1>Add Canvas</h1>
            <div className='top-0 right-0' onClick={()=> {showAddCanvasModal = false}}>X</div>
            <ul>
                <li>Canvas Creator </li>
                <li>Canvas Name {username}</li>
                <li>Canvas Size: 1024 x 1024</li>
                <li>Canvas Collaborators <div className='rounded-lg text-center bg-gray' onClick={()=> {showAddCollaboratorsModal = true}}>+</div>
                    <ul>
                        {canvasCollaborators.map((canvasCollaborator, index)=> (
                            <li key={index}> {canvasCollaborator}</li>
                        ))}
                    </ul>
                    <AddCollaborators showAddCollaboratorsModal={showAddCollaboratorsModal}>

                    </AddCollaborators>
                </li> 
                <li>Public Access
                <div>Anyone with the link can view</div> <input type="checkbox"></input>
                <div>Anyone with the link can view and edit</div> <input type="checkbox"></input> 
                </li>
            </ul>
            <button> Create Canvas</button>
        </div>  
    </div>
    }
    </>
)
} export default AddCanvas;