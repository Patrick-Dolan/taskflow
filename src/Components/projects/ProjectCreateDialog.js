import { Container } from '@mui/system';
import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { v4 as uuid } from "uuid";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectCreateDialog = (props) => {
  const { open, setOpen, projects, setProjects, setSelectedProject } = props; 
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [error, setError] = useState(false);


  const handleClose = () => {
    setError(false);
    setOpen(false);
  };

  const handleCreateProject = () => {
    // Sets selected project to an empty object if create project button is clicked while in project details to hide details component
    setSelectedProject({});

    // Add project to projects array
    setProjects([...projects, {
      id: uuid(),
      name: projectName.trim(),
      description: projectDescription.trim()
    }])

    // Close project create dialog box and reset create project state
    setProjectName("");
    setProjectDescription("");
    setOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    (projectName !== "") ? setError(false) : setError(true);

    if (projectName.length >= 1) {
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
              Create new project
            </Typography>
            {/* TODO decide if I will use save button and its functionality */}
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              label="Project Name*"
              onChange={(e) => setProjectName(e.target.value)}
              margin="normal"
              error={error}
              helperText={(error) ? "Project name is required" : ""}
              fullWidth
            />
            <TextField
              type="text"
              label="Description"
              onChange={(e) => setProjectDescription(e.target.value)}
              size="small"
              minRows="4"
              margin="normal"
              multiline
              fullWidth
            />
            <Button type="submit" variant="outlined">Create project</Button>
          </form>
        </Container>
      </Dialog>
    </div>
  );
}

export default ProjectCreateDialog;