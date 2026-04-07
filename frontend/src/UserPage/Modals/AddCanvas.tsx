import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { type CanvasDetails, type BasicUserDetails } from "../../Interfaces"
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';


type AddCanvasProps = {
    open: boolean,
    onClose: () => void,
    username: string
}

function AddCanvas ({ open, onClose, username}: AddCanvasProps) {
        
    
    const [canvasName, setCanvasName] = useState<string>("");
    const [canvasNameAlreadyExists, setCanvasNameAlreadyExists] = useState(false);
    const [canvasCollaborators, setCanvasCollaborators] = useState<BasicUserDetails[]>([]);
    const [potentialCollaborators, setPotentialCollaborators] = useState<BasicUserDetails[]>([]);
    const [searchPotentialCollaborators, setSearchPotentialCollaborators] = useState<string>("");

    let navigate = useNavigate();

    async function createCanvas() {
        const canvasDetailsToPut :CanvasDetails = {
            id: -1,
            name: '',
            thumbnail: '',
            dateCreated: new Date(),
            lastEdited: new Date(),
            ownerId: 1,
            collaboratorIds: []
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

    async function getPotentialCollaborators() {
        fetch("/basicuserdetails", {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
            const userObjects = data.parse();
            userObjects.forEach((userObject: BasicUserDetails) => setPotentialCollaborators([...potentialCollaborators, userObject]));
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    useEffect(()=> {

    });

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
                > 
                    Add Canvas Collaborators: 
                    <input  
                        value={searchPotentialCollaborators}
                        onChange={e => {
                            setSearchPotentialCollaborators(e.target.value); 
                            if(e.target.value.length > 0){
                                getPotentialCollaborators();
                            }
                        }}
                        placeholder="Search for collaborators here" 
                        type="text" 
                        className="bg-[#808287] rounded-sm text-white p-1 m-1 m-2">
                    </input>
                    <ul className='overflow-y-scroll h-20 border-2 border-solid'> 
                        {potentialCollaborators.map((canvasCollaborator, index) => (
                            <li onClick={() => setCanvasCollaborators([...canvasCollaborators, canvasCollaborator]) } className={'text-'+ canvasCollaborator.colour} key={index}> {canvasCollaborator.username}</li>
                        ))}
                    </ul>
                </li> 
                <li className='m-2'>
                    <ul className='font-bold'>Canvas Collaborators:
                        {canvasCollaborators.map((canvasCollaborator, index)=> (
                            <li key={index}> {canvasCollaborator.username}</li>
                        ))}
                        <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
                    </ul> 
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