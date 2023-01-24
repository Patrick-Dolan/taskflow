import { Container } from "@mui/system";
import TasksToolbar from "./TasksToolbar";
import TaskCreateDialog from "./TaskCreateDialog";
import { useState } from "react";
import TasksList from "./TasksList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { Button } from "@mui/material";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: uuid(),
      name: "Research components",
      description: "Research and compare the best components for building a custom PC, including processors, motherboards, graphics cards, and memory.",
      dueDate: dayjs("2022-05-01"),
      dueDateAssigned: true
    },
    {
      id: uuid(),
      name: "Purchase components",
      description: "Purchase all the necessary components for building the custom PC, including processors, motherboards, graphics cards, and memory.",
      dueDate: dayjs("2022-05-15"),
      dueDateAssigned: true
    },
    {
      id: uuid(),
      name: "Assemble PC",
      description: "Assemble the custom PC, including installing the processor, motherboard, graphics card, memory, and all other necessary components.",
      dueDate: dayjs("2022-06-01"),
      dueDateAssigned: false
    },
    {
      id: uuid(),
      name: "Install operating system",
      description: "Install an operating system on the custom PC, such as Windows or Linux.",
      dueDate: dayjs("2022-06-15"),
      dueDateAssigned: false
    },
    {
      id: uuid(),
      name: "Test and optimize",
      description: "Test the custom PC for any issues and optimize its performance by tweaking settings and updating drivers.",
      dueDate: dayjs("2022-07-01"),
      dueDateAssigned: false
    },
    {
      id: uuid(),
      name: "Design Concept",
      description: "Create a detailed design concept for the cosplay, including sketches and reference images.",
      dueDate: dayjs("2023-03-01"),
      dueDateAssigned: true
    },
    {
      id: uuid(),
      name: "Material Gathering",
      description: "Gather all materials needed for the cosplay, including fabric, foam, paint, and any additional props.",
      dueDate: dayjs("2023-04-15"),
      dueDateAssigned: true
    },
    {
      id: uuid(),
      name: "Construction",
      description: "Construct the cosplay, including sewing, sculpting, and painting.",
      dueDate: dayjs("2023-06-01"),
      dueDateAssigned: true
    },
    {
      id: uuid(),
      name: "Accessories",
      description: "Create any necessary accessories for the cosplay, such as weapons or jewelry.",
      dueDate: dayjs("2023-07-15"),
      dueDateAssigned: true
    },
    {
      id: uuid(),
      name: "Final Touches",
      description: "Make any final adjustments to the cosplay and prepare it for wear.",
      dueDate: dayjs("2023-08-01"),
      dueDateAssigned: true
    }
  ]);
  const [openTaskCreate, setOpenTaskCreate] = useState(false);
  const [searchedTask, setSearchedTask] = useState("");

  const handleTaskCreateOpen = () => {
    setOpenTaskCreate(true);
  }

  const handleSearchClear = () => {
    setSearchedTask(null);
  }

  console.log(tasks)
  console.log(searchedTask)

  return (
    <Container maxWidth="md" sx={{marginTop: "1.5em"}}>
      <Button variant="outlined" onClick={handleSearchClear}>Clear search</Button>
      <TasksToolbar 
        tasks={tasks}
        searchedTask={searchedTask}
        setSearchedTask={setSearchedTask}
        handleTaskCreateOpen={handleTaskCreateOpen}
      />
      <TasksList 
        tasks={tasks}
        searchedTask={searchedTask}
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