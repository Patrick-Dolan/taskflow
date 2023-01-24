import { Container, Box } from '@mui/system';
import { forwardRef, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { v4 as uuid } from "uuid";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import dayjs from 'dayjs';
import UndoIcon from '@mui/icons-material/Undo';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TaskCreateDialog = (props) => {
  const { open, setOpen, tasks, setTasks, setSelectedTask } = props; 
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState(false);
  const [dueDate, setDueDate] = useState(dayjs());
  const [dueDateAssigned, setDueDateAssigned] = useState(false);


  const handleClose = () => {
    setError(false);
    setOpen(false);
    setDueDateAssigned(false);
  };

  const handleCreateProject = () => {
    // Sets selected task to and empty object if create task button is clicked while in task details to hide details component
    setSelectedTask({});

    // Add task to tasks array
    setTasks([...tasks, {
      id: uuid(),
      name: taskName.trim(),
      description: taskDescription.trim(),
      dueDate: dueDate,
      dueDateAssigned: dueDateAssigned
    }])

    // Close task create dialog box and reset create task state
    setTaskName("");
    setTaskDescription("");
    setDueDateAssigned(false);
    setOpen(false);
  }

  const handleDateChange = (newDate) => {
    setDueDate(newDate);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    (taskName !== "") ? setError(false) : setError(true);

    if (taskName.length >= 1) {
      handleCreateProject();
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
              Create new task
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
                    onChange={(e) => setTaskName(e.target.value)}
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
                        <UndoIcon />
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
                  onChange={(e) => setTaskDescription(e.target.value)}
                  size="small"
                  minRows="4"
                  margin="normal"
                  multiline
                  fullWidth
                />
              </Grid>
              <Button type="submit" variant="outlined">Create task</Button>
            </Grid>
          </form>
        </Container>
      </Dialog>
    </div>
  );
}

export default TaskCreateDialog;