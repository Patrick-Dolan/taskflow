import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import TaskEditDialog from "./TaskEditDialog";
import TaskDeleteDialog from "./TaskDeleteDialog";

const TaskDetails = (props) => {
  const { task, tasks, setTasks, setSelectedTask } = props;
  const [openTaskEdit, setOpenTaskEdit] = useState(false);
  const [openTaskDelete, setOpenTaskDelete] = useState(false);

  const handleGoBackClick = () => {
    setSelectedTask({});
  }

  const handleEditEditOpen = () => {
    setOpenTaskEdit(true);
  }

  const handleTaskDeleteOpen = () => {
    setOpenTaskDelete(true);
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
        <Button variant="contained" onClick={handleGoBackClick}>Go Back</Button>
        <Box>
          <Button variant="contained" onClick={handleEditEditOpen} sx={{marginRight: ".5em"}}>Edit</Button>
          <Button variant="contained" onClick={handleTaskDeleteOpen}>Delete</Button>
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
      <TaskEditDialog 
        open={openTaskEdit}
        setOpen={setOpenTaskEdit}
        task={task}
        tasks={tasks}
        setTasks={setTasks}
        setSelectedTask={setSelectedTask}
      />
      <TaskDeleteDialog 
        open={openTaskDelete}
        setOpen={setOpenTaskDelete}
        task={task}
        tasks={tasks}
        setTasks={setTasks}
        setSelectedTask={setSelectedTask}
      />
    </>
  )
}

export default TaskDetails;