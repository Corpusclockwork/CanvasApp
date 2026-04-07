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
    getPotentialCollaborators();
}, [])

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
        </DialogContent>
    </Dialog>
    </>
)
} export default AddCollaborators;