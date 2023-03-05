import { Autocomplete, Button, Divider, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from "@emotion/react";

const TasksToolbar = (props) => {
  const { tasks, handleTaskCreateOpen, searchedTask, setSearchedTask } = props;
  const [showSearch, setShowSearch] = useState(false);
  const theme = useTheme();

  const taskNames = tasks.map((e) => (e.name));

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
          <Typography variant="h4">Tasks</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing="4">
          <Grid item>
              <Tooltip title="Add Task" enterDelay={500} leaveDelay={200}>
                <Button sx={buttonStyles} variant="contained" size="small" onClick={handleTaskCreateOpen}><AddIcon /></Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Search Tasks" enterDelay={500} leaveDelay={200}>
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
          options={taskNames}
          getOptionLabel={(option) => option}
          inputValue={searchedTask || ""}
          size="small"
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{minWidth: { sm: "15em", md: "30em" }}}
              label="Search for a task"
              variant="outlined"
            />
          )}
          onInputChange={(event, value) => setSearchedTask(value)}
        />
        : null
      }
    </>
  )
}

export default TasksToolbar;