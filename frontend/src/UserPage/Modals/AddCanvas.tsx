import { useState } from 'react';
import AddCollaborators from './AddCollaborators';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { type CanvasDetails, type CollaboratorDetails } from '../UserDetails';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';


type AddCanvasProps = {
    open: boolean,
    onClose: () => void,
    username: string
}

function AddCanvas ({ open, onClose, username}: AddCanvasProps) {
        
    const [canvasCollaborators, setCanvasCollaborators] = useState<CollaboratorDetails[]>([]);
    const [canvasName, setCanvasName] = useState<string>("");
    const [openAddCollaboratorsDialog, setOpenAddCollaboratorsDialog] = useState(false);
    const [canvasNameAlreadyExists, setCanvasNameAlreadyExists] = useState(false);

    let navigate = useNavigate();

    function createCanvas() {
        const canvasDetailsToPut :CanvasDetails = {
            canvasName: '',
            thumbnail: '',
            dateCreated: new Date(),
            lastEdited: new Date(),
            collaborators: canvasCollaborators
        };
        fetch("/canvases/add", {
        method: "PUT",
        body: JSON.stringify({canvasDetailsToPut}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => {
        if(response.ok) {
            navigate("/canvas/{id}");
        }
    })
    .catch((err) => {
        if (err.statusCode === 400){
            setCanvasNameAlreadyExists(true)
        }
        console.log(err.message);
    })
    }

return (
<>
    <Dialog
        open={open}
        onClose={onClose}
    >
        <DialogTitle id="alert-dialog-title" sx={{backgroundColor: '#D9D9D9', color:'#3e4b60'}}>
        {"Add Canvas"}
        </DialogTitle>
        <IconButton
            onClick={onClose}
            sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            }}
        >   
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{backgroundColor: '#D9D9D9', color:'#3e4b60'}}>
            <ul>
                <li className='flex m-2'><div className='font-bold'>Canvas Creator: </div>  {username} </li>
                <li className='flex items-center m-2'>
                    <div className='font-bold'>
                        Canvas Name: 
                    </div> 
                    <input  
                        value={canvasName}
                        onChange={e => {setCanvasName(e.target.value); setCanvasNameAlreadyExists(false);}}
                        placeholder="Enter Canvas Name here" 
                        type="text" 
                        className="bg-[#808287] rounded-sm text-white p-1 m-1 mx-3">
                    </input>
                </li>
                <li className='flex m-2' ><div className='font-bold mr-2'>Canvas Size: </div>1024 x 1024</li>
                <li 
                    className='bg-[#808287] rounded-sm p-2 m-2 text-white' 
                    onClick={()=> setOpenAddCollaboratorsDialog(true)}
                > 
                    Add Canvas Collaborators 
                    <AddCircleOutlineIcon fontSize="small"></AddCircleOutlineIcon>
                    <ul>
                        {canvasCollaborators.map((canvasCollaborator, index)=> (
                            <li key={index}> {canvasCollaborator.username}</li>
                        ))}
                    </ul>

                    { openAddCollaboratorsDialog &&
                    <div>
                          <ul> Results
                            <li>
                                {potentialCollaborators.map((canvasCollaborator, index)=> (
                                            <li key={index}> {canvasCollaborator.username}</li>
                                ))}
                            </li>
                        </ul>
                        <ul>Canvas Collaborators <AddCircleOutlineIcon fontSize="small"></AddCircleOutlineIcon>
                                <li>
                                    {canvasCollaborators.map((canvasCollaborator, index)=> (
                                        <li key={index}> {canvasCollaborator.username}</li>
                                    ))}
                                </li>
                        </ul> 
                    </div>
                    }
                </li> 
                <li className='m-2'><div className='font-bold'>Public Access</div>
                <div>Anyone with the link can view <input type="checkbox"></input></div> 
                <div>Anyone with the link can view and edit <input type="checkbox"></input></div>
                </li>
            </ul>
            {  !canvasName &&
                <div className='text-xs text-center'> Enter a username before clicking create</div>
            }
            { canvasNameAlreadyExists &&
                <div className='text-[#fc0000] text-xs text-center'> You have already used this canvas name elewhere</div>
            }
            <div className='flex justify-end'>
                <button 
                    disabled={canvasName === ""}
                    onClick={()=> createCanvas()} 
                    className={(canvasName === "") ? "bg-[#808287] text-[#3e4b60] p-2 m-2 rounded-sm" :'cursor-pointer bg-[#808287] hover:bg-[#808287] text-white hover:text-[#3e4b60] p-2 m-2 rounded-sm'}
                >
                    Create Canvas
                </button>
            </div>
        </DialogContent>
    </Dialog>
</>
)
} export default AddCanvas;