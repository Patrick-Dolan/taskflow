import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ProjectDetails = (props) => {
  const { project, setSelectedProject } = props;

  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: ".5em",
        marginBottom: "1em",
      }}
      >
        <Button variant="contained" onClick={() => setSelectedProject({})}>Go Back</Button>
        <Button variant="contained">Edit</Button>
      </Box>
      <Typography variant="caption">Project Name</Typography>
      <Typography variant="h5">{project?.name}</Typography>
      <Typography variant="caption">Description</Typography>
      <Typography>{project?.description}</Typography>
      <Typography variant="caption">Tasks</Typography>
      {(project.tasks) ? (
        project?.tasks.map((task, index) => (
          <Typography key={index}>{task}</Typography>
        ))
      ) : (
          <Typography>No tasks assigned to this project.</Typography>
      )}
      
    </>
  )
}

export default ProjectDetails;