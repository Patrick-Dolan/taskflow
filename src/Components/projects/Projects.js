import { Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import ProjectCreateDialog from "./ProjectCreateDialog";

const Projects = () => {
  const [newProject, setNewProject] = useState({});

  // Dialog State
  const [openProjectCreate, setOpenProjectCreate] = useState(false);
  
  // Create project State
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  
  const handleProjectCreateOpen = () => {
    setOpenProjectCreate(true);
  }
  
  const handleCreateProject = () => {
    setNewProject({
      name: projectName.trim(),
      description: projectDescription.trim()
    })
  }

  console.log(newProject);

  return (
    <Container maxWidth="md" sx={{marginTop: "1.5em"}}>
      <Typography variant="h4">Projects</Typography>
      <Button variant="outlined" onClick={handleProjectCreateOpen}>Create Project</Button>
      <ProjectCreateDialog
        open={openProjectCreate}
        setOpen={setOpenProjectCreate}
        setProjectName={setProjectName}
        setProjectDescription={setProjectDescription}
        createProject={handleCreateProject}
      />
    </Container>
  )
}

export default Projects;