import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@emotion/react';

const ProjectDeleteDialog = (props) => {
  const { open, setOpen, project, projects, setProjects, setSelectedProject } = props;
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProject = () => {
    // Filter out project to be deleted
    const updatedProjects = projects.filter((p) => p.id !== project.id)

    // Update projects without the deleted one
    setProjects([...updatedProjects]);

    // Set selected project to null to send user back to project list
    setSelectedProject(null);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="Delete project?"
      aria-describedby="Are you sure you want to delete this project? This action is irreversible."
    >
      <DialogTitle>Delete project?</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this project? This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDeleteProject} sx={{color: theme.palette.error.main}}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDeleteDialog;