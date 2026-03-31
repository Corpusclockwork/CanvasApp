import { useState } from 'react';
import AddCollaborators from './AddCollaborators';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import type { CollaboratorDetails } from '../UserDetails';
import IconButton from '@mui/material/IconButton';

type AddCanvasProps = {
    open: boolean,
    onClose: () => void,
    username: string
}

function AddCanvas ({ open, onClose, username}: AddCanvasProps) {
const [canvasCollaborators, setCanvasCollaborators] = useState<CollaboratorDetails[]>([]);
const [openAddCollaboratorsDialog, setOpenAddCollaboratorsDialog] = useState(false);

return (
<>
    <Dialog
        open={open}
        onClose={onClose}
        color="red"
    >
        <DialogTitle id="alert-dialog-title">
        {"Add Canvas"}
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
            <ul>
                <li>Canvas Creator: {username} </li>
                <li>Canvas Name {username}</li>
                <li>Canvas Size: 1024 x 1024</li>
                <li onClick={()=> setOpenAddCollaboratorsDialog(true)}> Canvas Collaborators <AddCircleOutlineIcon fontSize="small"></AddCircleOutlineIcon>
                    <ul>
                        {canvasCollaborators.map((canvasCollaborator, index)=> (
                            <li key={index}> {canvasCollaborator.username}</li>
                        ))}
                    </ul>
                    <AddCollaborators 
                        open={openAddCollaboratorsDialog}
                        onClose={() => setOpenAddCollaboratorsDialog(false)}
                        canvasCollaborators = {canvasCollaborators}>
                    </AddCollaborators>
                </li> 
                <li>Public Access
                <div>Anyone with the link can view</div> <input type="checkbox"></input>
                <div>Anyone with the link can view and edit</div> <input type="checkbox"></input> 
                </li>
            </ul>
        </DialogContent>
    </Dialog>
</>
)
} export default AddCanvas;