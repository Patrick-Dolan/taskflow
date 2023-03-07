import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import TaskEditDialog from "./TaskEditDialog";
import TaskDeleteDialog from "./TaskDeleteDialog";
import { UserAuth } from "../../Contexts/AuthContext";
import { updateUnassignedTaskDB } from "../../FirebaseFunctions";

const TaskDetails = (props) => {
  const { user } = UserAuth();
  const { task, setSelectedTask, refreshTasksList } = props;
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

  const handleTaskCompletedUpdate = async (taskStatus) => {
    const updatedTask = {
      ...task,
      taskCompleted: taskStatus
    }

    try {
      await updateUnassignedTaskDB(user.uid, updatedTask);
      refreshTasksList();

      // Update local state of TaskDetails
      setSelectedTask(updatedTask);

      // TODO add toast for success/error
      console.log("Task completion status updated.");
    } catch (e) {
      console.log(e.message);
    }
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
      <Typography variant="caption">Status</Typography>
      <Typography variant="h5">{(task?.taskCompleted) ? ("Task completed") : ("Task unfinished")}</Typography>
      <Typography variant="caption">Description</Typography>
      <Typography>{(task?.description) ? `${task.description}` : "No description available."}</Typography>
      <Typography variant="caption">Due date</Typography>
      <Typography>{(task?.dueDateAssigned) ? `${task.dueDate.format("MM-DD-YYYY")}` : "No due date assigned."}</Typography>
      <Typography variant="caption">Assigned to:</Typography>
      {/* TODO: set up assignment system */}
      <Typography>{(task?.assignedTo) ? `FEATURE NOT IMPLEMENTED YET` : "FEATURE NOT IMPLEMENTED YET"}</Typography>
      <Box
        sx={{
          marginTop: "2em"
        }}
      >
        {(task.taskCompleted) ? (
          <Button
          variant="contained"
          onClick={() => handleTaskCompletedUpdate(false)}
          >
            Mark task as unfinished
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => handleTaskCompletedUpdate(true)}
          >
            Mark task as completed
          </Button>
        )}
      </Box>
      <TaskEditDialog 
        open={openTaskEdit}
        setOpen={setOpenTaskEdit}
        task={task}
        setSelectedTask={setSelectedTask}
        refreshTasksList={refreshTasksList}
      />
      <TaskDeleteDialog 
        open={openTaskDelete}
        setOpen={setOpenTaskDelete}
        task={task}
        setSelectedTask={setSelectedTask}
        refreshTasksList={refreshTasksList}
      />
    </>
  )
}

export default TaskDetails;