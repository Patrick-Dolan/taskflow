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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectEditDialog = (props) => {
  const { open, setOpen, project, setEditedProjectName, setEditedProjectDescription, updateProject } = props; 

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateProject = () => {
    updateProject();
    setOpen(false);
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
              Edit {(project?.name) ? (`${project.name}`) : ("Project")}
            </Typography>
            {/* TODO decide if I will use save button and its functionality */}
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <TextField
            type="text"
            label="Project Name"
            defaultValue={project?.name}
            onChange={(e) => setEditedProjectName(e.target.value)}
            margin="normal"
            fullWidth
            required
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
            required
          />
          <Button variant="outlined" onClick={handleUpdateProject}>Update project</Button>
        </Container>
      </Dialog>
    </div>
  );
}

export default ProjectEditDialog;