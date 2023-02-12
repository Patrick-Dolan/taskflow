import { Autocomplete, Button, Divider, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from "@emotion/react";

const ProjectsToolbar = (props) => {
  const { handleCreateProjectDialogBox, projects, searchedProject, setSearchedProject } = props;
  const [showSearch, setShowSearch] = useState(false);
  const theme = useTheme();

  const projectNames = projects.map((e) => (e.name));

  // TODO set up css and classname
  const buttonStyles = {
    maxHeight: "2.5em",
    minHeight: "2.5em",
    maxWidth: "2.5em",
    minWidth: "2.5em",
  }

  return (
    <>
      <Grid 
        container 
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4">Projects</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing="4">
            <Grid item>
              <Tooltip title="Add Project" enterDelay={500} leaveDelay={200}>
                <Button sx={buttonStyles} variant="contained" size="small" onClick={handleCreateProjectDialogBox}><AddIcon /></Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Search Projects" enterDelay={500} leaveDelay={200}>
                <Button 
                  sx={{
                    ...buttonStyles, 
                    backgroundColor: (showSearch) ? theme.palette.primary.light : theme.palette.primary.main
                  }} 
                  variant="contained" 
                  size="small" 
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <SearchIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider 
        sx={{
          marginBottom: ".65em"
        }}
      />
      {(showSearch) ? 
        <Autocomplete
          sx={{
            marginBottom: ".65em"
          }}
          options={projectNames}
          getOptionLabel={(option) => option}
          size="small"
          inputValue={searchedProject}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{minWidth: { sm: "15em", md: "30em" }}}
              label="Search for a project"
              variant="outlined"
            />
          )}
          onInputChange={(event, value) => setSearchedProject(value)}
        />
        : null
      }
    </>
  )
}

export default ProjectsToolbar;