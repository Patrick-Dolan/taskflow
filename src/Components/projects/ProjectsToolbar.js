import { Box, Button, Divider, Typography } from "@mui/material";

const ProjectsToolbar = (props) => {
  const { handleCreateProjectDialogBox } = props;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: ".5em"
        }}
      >
        <Typography variant="h4">Projects</Typography>
        <Button variant="outlined" onClick={handleCreateProjectDialogBox}>Create Project</Button>
      </Box>
      <Divider />
    </>
  )
}

export default ProjectsToolbar;