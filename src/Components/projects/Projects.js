import { Container } from "@mui/system";
import { useState } from "react";
import ProjectCreateDialog from "./ProjectCreateDialog";
import ProjectsToolbar from "./ProjectsToolbar";
import ProjectsList from "./ProjectsList";

const Projects = () => {
  const [newProject, setNewProject] = useState({});
  const [projects, setProjects] = useState([
    {name: "seed1", description: "description"},
    {name: "seed2", description: "description2"},
    {name: "seed3", description: "description3 "},
  ]);

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

    setProjects([...projects, {
      name: projectName.trim(),
      description: projectDescription.trim()
    }])
  }

  console.log("New project: ", newProject);
  console.log("All projects: ", projects);

  return (
    <Container maxWidth="md" sx={{marginTop: "1.5em"}}>
      <ProjectsToolbar handleCreateProjectDialogBox={handleProjectCreateOpen} />
      <ProjectsList projects={projects} />
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