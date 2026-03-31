import { useState, useEffect } from 'react';
import type { CollaboratorDetails } from '../UserDetails';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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
        <DialogTitle id="alert-dialog-title">
        {"Add Canvas Collaborators"}
        </DialogTitle>
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={() => ({
            position: 'absolute',
            right: 8,
            top: 8
            })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
            <li> Results
            <ul>
                {potentialCollaborators.map((canvasCollaborator, index)=> (
                            <li key={index}> {canvasCollaborator.username}</li>
                ))}
            </ul>
            </li>
             <li>Canvas Collaborators <div className='rounded-lg text-center bg-gray'>+</div>
                    <ul>
                        {canvasCollaborators.map((canvasCollaborator, index)=> (
                            <li key={index}> {canvasCollaborator.username}</li>
                        ))}
                    </ul>
            </li> 
        </DialogContent>
    </Dialog>
    </>
)
} export default AddCollaborators;