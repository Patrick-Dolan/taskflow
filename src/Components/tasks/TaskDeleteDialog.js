import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@emotion/react';
import { deleteUnassignedTaskFromDB } from '../../FirebaseFunctions';
import { UserAuth } from '../../Contexts/AuthContext';

const TaskDeleteDialog = (props) => {
  const { user } = UserAuth();
  const { open, setOpen, task, setSelectedTask, refreshTasksList } = props;
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTask = async () => {
    // Delete task from firestore
    try {
      await deleteUnassignedTaskFromDB(user.uid, task.id)
      refreshTasksList();
      // TODO add toast for success/error
      console.log("Task deleted successfully")
    } catch (e) {
      console.log(e.message)
    }

    // Set selected task to null to send user back to task list
    setSelectedTask(null);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="Delete task?"
      aria-describedby="Are you sure you want to delete this task? This action is irreversible."
    >
      <DialogTitle>Delete task?</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this task? This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDeleteTask} sx={{color: theme.palette.error.main}}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskDeleteDialog;