import { Container, Box } from '@mui/system';
import { forwardRef, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TaskEditDialog = (props) => {
  const { open, setOpen, task, tasks, setTasks, setSelectedTask } = props; 
  const [editedTaskName, setEditedTaskName] = useState(task?.name);
  const [editedTaskDescription, setEditedTaskDescription] = useState(task?.description);
  const [error, setError] = useState(false);
  const [dueDate, setDueDate] = useState((task?.dueDateAssigned) ? (task.dueDate) : (dayjs()));
  const [dueDateAssigned, setDueDateAssigned] = useState((task.dueDateAssigned === true) ? (task.dueDateAssigned) : false);

  const handleClose = () => {
    setError(false);
    setOpen(false);
    (task.dueDateAssigned === true) ? setDueDateAssigned(task.dueDateAssigned) : setDueDateAssigned(false);
  };

  const handleUpdateTask = () => {
    // Filter out old version of task and create updatedTask object
    const filteredTasks = tasks.filter((t) => t.id !== task.id);
    const updatedTask = {
      ...task,
      name: editedTaskName.trim(),
      description: editedTaskDescription.trim(),
      dueDate: dueDate,
      dueDateAssigned: dueDateAssigned
    }
    
    // Add task to tasks array
    setTasks([
      ...filteredTasks,
      updatedTask
    ])

    // Updates state for details page to show new info
    setSelectedTask(updatedTask)

    // Close task create dialog box and reset create task state
    handleClose();
  }

  const handleDateChange = (newDate) => {
    setDueDate(newDate);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    (editedTaskName !== "") ? setError(false) : setError(true);

    if (editedTaskName?.length >= 1) {
      handleUpdateTask();
    }
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit {(task?.name) ? (`"${task.name}"`) : ("Task")}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid container item columnSpacing={3} alignItems="center">
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    type="text"
                    label="Task name*"
                    defaultValue={task?.name}
                    onChange={(e) => setEditedTaskName(e.target.value)}
                    margin="normal"
                    error={error}
                    helperText={(error) ? "Task name is required" : ""}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {(dueDateAssigned) ? (
                    <Box sx={{display: "flex", alignItems: "center"}}>
                      <IconButton
                        variant="contained" 
                        margin="normal" 
                        sx={{height: "75%", marginRight: ".25em"}}
                        onClick={() => setDueDateAssigned(false)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <DesktopDatePicker
                        label="Due Date"
                        inputFormat="MM/DD/YYYY"
                        disablePast={true}
                        value={dueDate}
                        onChange={handleDateChange}
                        renderInput={(params) =>
                          <TextField
                          {...params}
                          margin="normal"
                          fullWidth
                          />}
                      />
                    </Box>
                  ) : (
                    <Button 
                      variant="contained" 
                      margin="normal" 
                      size="large" 
                      fullWidth
                      onClick={() => setDueDateAssigned(true)}
                    >
                      Set due date
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Grid container item>
                <TextField
                  type="text"
                  label="Description"
                  defaultValue={task?.description}
                  onChange={(e) => setEditedTaskDescription(e.target.value)}
                  size="small"
                  minRows="4"
                  margin="normal"
                  multiline
                  fullWidth
                />
              </Grid>
              <Button type="submit" variant="outlined">Update task</Button>
            </Grid>
          </form>
        </Container>
      </Dialog>
    </div>
  );
}

export default TaskEditDialog;