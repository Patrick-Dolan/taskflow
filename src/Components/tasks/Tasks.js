import { Container } from "@mui/system";
import TasksToolbar from "./TasksToolbar";

const Tasks = () => {
  return (
    <Container maxWidth="md" sx={{marginTop: "1.5em"}}>
      <TasksToolbar />
    </Container>
  )
}

export default Tasks;