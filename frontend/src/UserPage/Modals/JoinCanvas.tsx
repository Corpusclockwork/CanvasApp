import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { type CanvasDetails, type BasicUserDetails } from "../../Interfaces"
import IconButton from '@mui/material/IconButton';

type JoinCanvas = {
    open: boolean,
    onClose: () => void,
    username: string,
    userId: number
}

function JoinCanvas ({ open, onClose, username, userId}: JoinCanvas) {
    const [canvasesList, setCanvasesList] = useState<CanvasDetails[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    async function getAllCanvasDetails() {
        fetch("/canvases/allcanvasdetails", {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
             const canvasObjects = data.parse();
            canvasObjects.forEach((canvasObject: CanvasDetails) => setCanvasesList([...canvasesList, canvasObject]))
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    async function searchForCanvases(searchTerm : string) {
        fetch(`/canvases/canvasdetails/searchterm=${searchTerm}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
            const canvasObjects = data.parse();
            canvasObjects.forEach((canvasObject: CanvasDetails) => setCanvasesList([...canvasesList, canvasObject]))
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    async function addUserToCanvas(canvasId: number) {
        fetch(`/canvases/addusertocanvas/canvasid=${canvasId}/userId=${userId}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
            const canvasObjects = data.parse();
            canvasObjects.forEach((canvasObject: CanvasDetails) => setCanvasesList([...canvasesList, canvasObject]));
        })
        .catch((err) => {
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
        {"Join a Canvas"}
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
             <div className="flex items-center">
                <div className="">Search for new canvases to join as {username}: </div>
                <div>
                    <input  
                        value={searchTerm}
                        onChange={e => {setSearchTerm(e.target.value); searchForCanvases(e.target.value);}}
                        placeholder="Search for collaborators here" 
                        type="text" 
                        className="bg-[#808287] rounded-sm text-white p-1 m-1">
                    </input>
                </div>
                <ul>
                    {canvasesList.map(canvas => (
                        <li onClick={()=> addUserToCanvas(canvas.id)}> 
                            <img src={canvas.thumbnail}> </img>
                            {canvas.collaboratorIds.includes(userId) &&
                                <div className='text-[#ff00]'> User is already a collaborator on this canvas</div>
                            }
                            {canvas.ownerId === userId &&
                                <div className='text-[#00ff]'> User is the owner of this canvas</div>
                            }
                            <div> Date Created: {canvas.dateCreated.toDateString()} </div>
                            <div> Last Edited: {canvas.lastEdited.toDateString()}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </DialogContent>
    </Dialog>
</>
)
} export default JoinCanvas;