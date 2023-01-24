import { Autocomplete, Box, Button, Divider, TextField, Typography } from "@mui/material";

const ProjectsToolbar = (props) => {
  const { handleCreateProjectDialogBox, projects, searchedProject, setSearchedProject } = props;

  const projectNames = projects.map((e) => (e.name));

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
        <Box
          sx={{
            display: "flex"
          }}
        >
          <Autocomplete
            options={projectNames}
            getOptionLabel={(option) => option}
            size="small"
            clearOnBlur
            inputValue={searchedProject}
            renderInput={(params) => (
              <TextField
                {...params}
                // TODO setup mobile view
                sx={{minWidth: { sm: "15em", md: "30em" }}}
                label="Search for a project"
                variant="outlined"
              />
            )}
            onChange={(event, value) => setSearchedProject(value)}
          />
          <Button variant="outlined" onClick={handleCreateProjectDialogBox}>Create Project</Button>
        </Box>
      </Box>
      <Divider />
    </>
  )
}

export default ProjectsToolbar;