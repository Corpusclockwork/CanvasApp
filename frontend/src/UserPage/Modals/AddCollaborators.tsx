import { useState, useEffect } from 'react';
import type { CollaboratorDetails } from '../UserDetails';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddCollaboratorsProps = {
    open: boolean,
    onClose: () => void,
    canvasCollaborators: CollaboratorDetails[]
}
function AddCollaborators ({open, onClose, canvasCollaborators}: AddCollaboratorsProps) {

const [potentialCollaborators, setPotentialCollaborators] = useState<CollaboratorDetails[]>([]);


const getPotentialCollaboratorsList = async () => {
        try {
        const response =  await (await fetch('/users/publicuserdetails')).json()
        setPotentialCollaborators(response);
    } catch {

    }
}

useEffect(() => {
    getPotentialCollaboratorsList();
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