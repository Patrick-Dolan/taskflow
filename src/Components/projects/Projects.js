import { Container } from "@mui/system";
import { useState } from "react";
import ProjectCreateDialog from "./ProjectCreateDialog";
import ProjectsToolbar from "./ProjectsToolbar";
import ProjectsList from "./ProjectsList";
import ProjectDetails from "./ProjectDetails";
import { v4 as uuid } from "uuid";


const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: uuid(),
      name: "TaskFlow", 
      description: "A project management application that incorporates both task assignments and communication features.",
      tasks: [
        "Build project functionality",
        "Build task functionality",
        "Setup firestore database",
        "Setup Hosting through firebase",
        "Add to portfolio"
      ]
    },
    {
      id: uuid(),
      name: "Build a Custom PC",
      description: "Assemble a custom built PC tailored to your gaming or work needs, with the latest hardware and design.",
      tasks: [
        "Research and select the components for the build (CPU, GPU, motherboard, etc.)",
        "Acquire the necessary tools for the build (screwdrivers, thermal paste, etc.)",
        "Assemble the PC according to the chosen design",
        "Install the operating system and necessary drivers",
        "Test and troubleshoot the build to ensure it is fully functional"
      ]
    },
    {
      id: uuid(),
      name: "Cosplay Creation",
      description: "Create a detailed cosplay of a favorite character from a geek culture series, movie, or game.",
    },
    {
      id: uuid(),
      name: "Tabletop RPG Campaign",
      description: "Create and run a campaign for a group of friends to play through a tabletop roleplaying game.",
      tasks: [
        "Research and select a tabletop RPG system to use for the campaign",
        "Create a detailed world and lore for the campaign",
        "Design and create non-player characters and enemies for the campaign",
        "Write and prepare a series of quests and events for the players to experience",
        "Run and facilitate the campaign sessions with the group"
      ]
    },
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
      id: uuid(),
      name: projectName.trim(),
      description: projectDescription.trim()
    }])
  }

  return (
    <Container maxWidth="md" sx={{marginTop: "1.5em"}}>
      <ProjectsToolbar handleCreateProjectDialogBox={handleProjectCreateOpen} />
      {(selectedProject?.id) ? (
        <ProjectDetails
          project={selectedProject}
          projects={projects}
          setSelectedProject={setSelectedProject}
          setProjects={setProjects}
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