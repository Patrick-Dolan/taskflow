import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

const TaskDetails = (props) => {
  const { task, setSelectedTask } = props;

  const handleGoBackClick = () => {
    setSelectedTask({});
  }

  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: ".5em",
        marginBottom: "1em",
      }}
      >
        <Button variant="contained" onClick={() => setSelectedTask({})}>Go Back</Button>
        <Box>
          <Button variant="contained" onClick={handleGoBackClick} sx={{marginRight: ".5em"}}>Edit</Button>
          <Button variant="contained" onClick={handleGoBackClick}>Delete</Button>
        </Box>
      </Box>
      <Typography variant="caption">Task</Typography>
      <Typography variant="h5">{task?.name}</Typography>
      <Typography variant="caption">Description</Typography>
      <Typography>{(task?.description) ? `${task.description}` : "No description available."}</Typography>
      <Typography variant="caption">Due date</Typography>
      <Typography>{(task?.dueDateAssigned) ? `${task.dueDate.format("MM-DD-YYYY")}` : "No due date assigned."}</Typography>
      <Typography variant="caption">Assigned to:</Typography>
      {/* TODO: set up assignment system */}
      <Typography>{(task?.assignedTo) ? `FEATURE NOT IMPLEMENTED YET` : "FEATURE NOT IMPLEMENTED YET"}</Typography>
    </>
  )
}

export default TaskDetails;