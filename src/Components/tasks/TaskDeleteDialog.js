import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@emotion/react';

const TaskDeleteDialog = (props) => {
  const { open, setOpen, task, tasks, setTasks, setSelectedTask } = props;
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTask = () => {
    // Filter out task to be deleted
    const updatedTasks = tasks.filter((p) => p.id !== task.id)

    // Update tasks without the deleted one
    setTasks([...updatedTasks]);

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