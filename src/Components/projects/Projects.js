import { Container } from "@mui/system";
import { useState } from "react";
import ProjectCreateDialog from "./ProjectCreateDialog";
import ProjectsToolbar from "./ProjectsToolbar";
import ProjectsList from "./ProjectsList";
import ProjectDetails from "./ProjectDetails";

const Projects = () => {
  const [projects, setProjects] = useState([
    {name: "seed1", description: "description"},
    {name: "seed2", description: "description2"},
    {name: "seed3", description: "description3 ", tasks: ["Task one", "Task two"]},
  ]);
  const [selectedProject, setSelectedProject] = useState({});

  // Dialog State
  const [openProjectCreate, setOpenProjectCreate] = useState(false);
  
  // Create project State
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  
  const handleProjectCreateOpen = () => {
    setOpenProjectCreate(true);
  }
  
  const handleCreateProject = () => {
    setSelectedProject(null);
    setProjects([...projects, {
      name: projectName.trim(),
      description: projectDescription.trim()
    }])
  }

  return (
    <Container maxWidth="md" sx={{marginTop: "1.5em"}}>
      <ProjectsToolbar handleCreateProjectDialogBox={handleProjectCreateOpen} />
      {(selectedProject?.name) ? (
        <ProjectDetails
          project={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      ) : (
        <ProjectsList projects={projects} setSelectedProject={setSelectedProject} />
      )}
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