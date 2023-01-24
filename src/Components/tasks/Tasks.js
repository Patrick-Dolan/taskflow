import { Container } from "@mui/system";
import TasksToolbar from "./TasksToolbar";
import TaskCreateDialog from "./TaskCreateDialog";
import { useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [openTaskCreate, setOpenTaskCreate] = useState(false);

  const handleTaskCreateOpen = () => {
    setOpenTaskCreate(true);
  }

  console.log(tasks)

  return (
    <Container maxWidth="md" sx={{marginTop: "1.5em"}}>
      <TasksToolbar 
        handleTaskCreateOpen={handleTaskCreateOpen}
      />
      <TaskCreateDialog
        open={openTaskCreate}
        setOpen={setOpenTaskCreate}
        tasks={tasks}
        setTasks={setTasks}
        handleTaskCreateOpen={handleTaskCreateOpen}
        // setSelectedProject={setSelectedProject}
      />
    </Container>
  )
}

export default Tasks;