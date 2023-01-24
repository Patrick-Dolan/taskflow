import { Container } from '@mui/system';
import { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectEditDialog = (props) => {
  const { open, setOpen, project, projects, setProjects, setSelectedProject } = props; 
  const [editedProjectName, setEditedProjectName] = useState(project?.name);
  const [editedProjectDescription, setEditedProjectDescription] = useState(project?.description);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setError(false);
    setOpen(false);
  };

  const handleUpdateProject = () => {
    // Filter out old version of project and create updatedProject object
    const filteredProjects = projects.filter((p) => p.id !== project.id);
    const updatedProject = {
      ...project,
      name: editedProjectName,
      description: editedProjectDescription
    }
    
    // Update ProjectsList component information by adding updated project back to projects
    setProjects([
      ...filteredProjects,
      updatedProject
    ])

    // Updates state for details page to show new info
    setSelectedProject(updatedProject)

    // Close ProjectEditDialog
    setOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    (editedProjectName !== "") ? setError(false) : setError(true);

    if (editedProjectName.length >= 1) {
      handleUpdateProject();
    }
  }

  return (
    <>
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
              Edit {(project?.name) ? (`${project.name}`) : ("Project")}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              label="Project Name"
              defaultValue={project?.name}
              onChange={(e) => setEditedProjectName(e.target.value)}
              margin="normal"
              error={error}
              helperText={(error) ? "Project name is required" : ""}
              fullWidth
            />
            <TextField
              type="text"
              label="Description"
              defaultValue={project?.description}
              onChange={(e) => setEditedProjectDescription(e.target.value)}
              size="small"
              minRows="4"
              margin="normal"
              multiline
              fullWidth
            />
            <Button type="submit" variant="outlined">Update project</Button>
          </form>
        </Container>
      </Dialog>
    </>
  );
}

export default ProjectEditDialog;