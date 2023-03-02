import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@emotion/react';
import { deleteProjectFromDB } from '../../FirebaseFunctions';
import { UserAuth } from '../../Contexts/AuthContext';

const ProjectDeleteDialog = (props) => {
  const { open, setOpen, project, setSelectedProject, refreshProjectsList } = props;
  const theme = useTheme();
  const { user } = UserAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProject = async () => {
    // Delete project from firestore
    try {
      await deleteProjectFromDB(user.uid, project.id)
      // TODO add snackbar for success and failure of delete project
      console.log("Project successfully deleted from database.");
    } catch (e) {
      console.log(e.message);
    }

    // Refresh ProjectsList component
    refreshProjectsList();

    // Set selected project to null to send user back to project list
    setSelectedProject(null);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="Delete project?"
      aria-describedby="Are you sure you want to delete this project? This action is irreversible."
    >
      <DialogTitle>Delete project?</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this project? This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDeleteProject} sx={{color: theme.palette.error.main}}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDeleteDialog;