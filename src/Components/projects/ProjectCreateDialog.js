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

const ProjectCreateDialog = (props) => {
  const { open, setOpen, setProjectName, setProjectDescription, createProject } = props; 

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateProject = () => {
    createProject();
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
              Create new project
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
            onChange={(e) => setProjectName(e.target.value)}
            margin="normal"
            fullWidth
            required
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
            required
          />
          <Button variant="outlined" onClick={handleCreateProject}>Create project</Button>
        </Container>
      </Dialog>
    </div>
  );
}

export default ProjectCreateDialog;