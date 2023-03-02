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
import { updateProjectDB } from '../../FirebaseFunctions';
import { UserAuth } from '../../Contexts/AuthContext';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectEditDialog = (props) => {
  const { user } = UserAuth();
  const { open, setOpen, project, setSelectedProject, refreshProjectsList } = props; 
  const [editedProjectName, setEditedProjectName] = useState(project?.name);
  const [editedProjectDescription, setEditedProjectDescription] = useState(project?.description);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setError(false);
    setOpen(false);
  };

  const handleUpdateProject = async () => {
    const updatedProject = {
      ...project,
      name: editedProjectName,
      description: editedProjectDescription
    }

    try {
      await updateProjectDB(user.uid, updatedProject);
      // TODO add snackbar for success and failure of project updates
      console.log("Project updated successfully.")
    } catch (e) {
      console.log(e.message);
    }
    
    // Update ProjectsList component 
    refreshProjectsList();

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