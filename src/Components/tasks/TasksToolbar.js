import { Autocomplete, Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";


const TasksToolbar = () => {
  const [searchedTask, setSearchedTask] = useState(null);
  const tempTasks = ["Task 1", "Task 2", "Task 3", "Task 4"];

  console.log(searchedTask)

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: ".5em"
        }}
      >
        <Typography variant="h4">Tasks</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center"
          }}
        >
          {/* TODO setup search functionality */}
          <Autocomplete
            options={tempTasks}
            getOptionLabel={(option) => option}
            size="small"
            clearOnBlur
            renderInput={(params) => (
              <TextField
                {...params}
                // TODO setup mobile view
                sx={{minWidth: { sm: "15em", md: "30em" }}}
                label="Search for a task"
                variant="outlined"
              />
            )}
            onChange={(event, value) => setSearchedTask(value)}
          />
          <Button variant="outlined" size="large" onClick={() => alert("Create clicked")}>Create task</Button>
        </Box>
      </Box>
      <Divider />
    </>
  )
}

export default TasksToolbar;