import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { type BasicUserDetails } from "../../Interfaces"

type AddCollaboratorsProps = {
    open: boolean,
    onClose: () => void,
    canvasId: number
}
function AddCollaborators ({open, onClose, canvasId}: AddCollaboratorsProps) {
    const [canvasCollaborators, setCanvasCollaborators] = useState<BasicUserDetails[]>([]);
    const [potentialCollaborators, setPotentialCollaborators] = useState<BasicUserDetails[]>([]);
    const [searchPotentialCollaborators, setSearchPotentialCollaborators] = useState<string>("");

    async function getAllPotentialCollaborators() {
        fetch("/users/alluserdetails", {
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

    async function searchForCollaborators(searchTerm : string) {
        fetch(`/canvases/canvasdetails/searchterm=${searchTerm}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
            const userObjects = data.parse();
            userObjects.forEach((userObject: BasicUserDetails) => setCanvasCollaborators([...canvasCollaborators, userObject]));
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    async function getCollaboratorsForCanvas(canvasId: number) {
        fetch(`/canvascollaborators/canvasid=${canvasId}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
            const userObjects = data.parse();
            userObjects.forEach((userObject: BasicUserDetails) => setCanvasCollaborators([...canvasCollaborators, userObject]));
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

useEffect(() => {
    getCollaboratorsForCanvas(canvasId);
    getAllPotentialCollaborators();
}, [canvasId])

return (
    <>
     <Dialog
        open={open}
        onClose={onClose}
    >
        <DialogTitle id="alert-dialog-title" sx={{backgroundColor: '#D9D9D9', color:'#3e4b60'}}>
        {"Add Collaborators"}
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
            Add Canvas Collaborators: 
             <input  
                value={searchPotentialCollaborators}
                onChange={e => {
                    setSearchPotentialCollaborators(e.target.value); 
                    if(e.target.value.length > 0){
                        searchForCollaborators(e.target.value);
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
        </DialogContent>
    </Dialog>
    </>
)
} export default AddCollaborators;