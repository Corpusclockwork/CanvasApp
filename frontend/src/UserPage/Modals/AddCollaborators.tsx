import { useState, useEffect } from 'react';

type AddCollaboratorsProps = {
    showAddCollaboratorsModal: boolean
}
function AddCollaborators ({showAddCollaboratorsModal}: AddCollaboratorsProps) {

const [canvasCollaborators, setCanvasCollaborators] = useState([]);


const getUsersList = async () => {
        try {
        const response =  await (await fetch('/users/usernames')).json()
        setCanvasCollaborators(response);
    } catch {

    }
}

useEffect(() => {
        getUsersList();
    }, [])

return (
    <>
    {showAddCollaboratorsModal && 
    <div className='top-1 left-0 w-screen h-screen bg-opacity-50 bg-gray-500'>
        <div className='bg-[#0E1F40] w-auto h-auto p-3 max-w-1/2 max-h-1/2'>
            <h1>Search</h1>
            <div className='rounded-sm bg-gray-600'> Search here</div>
            <div>Results


            </div>
            <li>Canvas Collaborators <div className='rounded-lg text-center bg-gray'>+</div>
                    <ul>
                        {canvasCollaborators.map((canvasCollaborator, index)=> (
                            <li key={index}> {canvasCollaborator}</li>
                        ))}
                    </ul>
                </li> 
            <button> Create Canvas</button>
        </div>  
    </div>
    }
    </>
)
} export default AddCollaborators;