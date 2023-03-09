import { Container, Box } from '@mui/system';
import { forwardRef, useState, useEffect } from 'react';
import { TextField, Grid, Button, Dialog, AppBar, Toolbar, IconButton, Typography, MenuItem } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { addUnassignedTaskToDB } from '../../FirebaseFunctions';
import { UserAuth } from '../../Contexts/AuthContext';
import { getProjects, updateProjectDB } from '../../FirebaseFunctions';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TaskCreateDialog = (props) => {
  const { user } = UserAuth();
  const { open, setOpen, setSelectedTask, refreshTasks } = props; 
  const [projects, setProjects] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState(false);
  const [dueDate, setDueDate] = useState(dayjs());
  const [dueDateAssigned, setDueDateAssigned] = useState(false);
  const [assignedProjectID, setAssignedProjectID] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjects(user.uid);
        setProjects([...projects]) 
      } catch (e) {
        console.log(e.message);
      }
    }

    fetchProjects();
  }, [user.uid])


  const handleClose = () => {
    setTaskName("");
    setTaskDescription("");
    setError(false);
    setDueDateAssigned(false);
    setOpen(false);
  };

  const handleCreateTask = async () => {
    // Sets selected task to and empty object if create task button is clicked while in task details to hide details component
    setSelectedTask({});

    // Add task to tasks array
    const newTask = {
      name: taskName.trim(),
      description: taskDescription.trim(),
      dueDate: dueDate,
      dueDateAssigned: dueDateAssigned,
      taskCompleted: false
    }

    try {
      // Check if task is assigned to a project
      if (assignedProjectID.length <= 0) {
        await addUnassignedTaskToDB(user.uid, newTask);
      } else {
        // Get selected project then update to include new task and update database
        const filteredProjects = projects.filter(e => e.id === assignedProjectID)
        const selectedProject = filteredProjects[0];
        console.log(selectedProject)
        const updatedProject = {
          ...selectedProject,
          tasks: (selectedProject?.tasks.length >= 1) ? [...selectedProject.tasks, newTask] : [newTask]
        }
        await updateProjectDB(user.uid, updatedProject);
      }
      // TODO add toast for success/error
      console.log("Task created and uploaded successfully.");
    } catch (e) {
      console.log(e.message);
    }

    // Close task create dialog box and refresh tasks list
    refreshTasks();
    handleClose();
  }

  const handleDateChange = (newDate) => {
    setDueDate(newDate);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    (taskName !== "") ? setError(false) : setError(true);

    if (taskName.length >= 1) {
      handleCreateTask();
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
                  onChange={(e) => setTaskDescription(e.target.value)}
                  size="small"
                  minRows="4"
                  margin="normal"
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid container item>
                <TextField
                  select
                  fullWidth
                  defaultValue=""
                  margin="normal"
                  label="Assign to Project"
                  onChange={(e) => setAssignedProjectID(e.target.value)}
                >
                  <MenuItem value=""><Typography variant="body2">None</Typography></MenuItem>
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      <Typography variant="body2">{project.name}</Typography>
                    </MenuItem>
                  ))}
                </TextField>
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