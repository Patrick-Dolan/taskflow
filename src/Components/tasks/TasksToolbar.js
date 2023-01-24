import { Autocomplete, Box, Button, Divider, TextField, Typography } from "@mui/material";

const TasksToolbar = (props) => {
  const { tasks, handleTaskCreateOpen, searchedTask, setSearchedTask } = props;
  const taskNames = tasks.map((e) => (e.name));

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
          <Autocomplete
            options={taskNames}
            getOptionLabel={(option) => option}
            inputValue={searchedTask}
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
          <Button variant="outlined" size="large" onClick={handleTaskCreateOpen}>Create task</Button>
        </Box>
      </Box>
      <Divider />
    </>
  )
}

export default TasksToolbar;