import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import ProjectCreateDialog from "./ProjectCreateDialog";
import ProjectsToolbar from "./ProjectsToolbar";
import ProjectsList from "./ProjectsList";
import ProjectDetails from "./ProjectDetails";
import { getProjects } from "../../FirebaseFunctions";
import { UserAuth } from "../../Contexts/AuthContext";

const Projects = () => {
  const { user } = UserAuth();
  const [projects, setProjects] = useState(
    [
      // {
      //   id: uuid(),
      //   name: "TaskFlow", 
      //   description: "A project management application that incorporates both task assignments and communication features.",
      //   tasks: [
      //     "Build project functionality",
      //     "Build task functionality",
      //     "Setup firestore database",
      //     "Setup Hosting through firebase",
      //     "Add to portfolio"
      //   ]
      // },
      // {
      //   id: uuid(),
      //   name: "Build a Custom PC",
      //   description: "Assemble a custom built PC tailored to your gaming or work needs, with the latest hardware and design.",
      //   tasks: [
      //     "Research and select the components for the build (CPU, GPU, motherboard, etc.)",
      //     "Acquire the necessary tools for the build (screwdrivers, thermal paste, etc.)",
      //     "Assemble the PC according to the chosen design",
      //     "Install the operating system and necessary drivers",
      //     "Test and troubleshoot the build to ensure it is fully functional"
      //   ]
      // },
      // {
      //   id: uuid(),
      //   name: "Cosplay Creation",
      //   description: "Create a detailed cosplay of a favorite character from a geek culture series, movie, or game.",
      // },
      // {
      //   id: uuid(),
      //   name: "Tabletop RPG Campaign",
      //   description: "Create and run a campaign for a group of friends to play through a tabletop roleplaying game.",
      //   tasks: [
      //     "Research and select a tabletop RPG system to use for the campaign",
      //     "Create a detailed world and lore for the campaign",
      //     "Design and create non-player characters and enemies for the campaign",
      //     "Write and prepare a series of quests and events for the players to experience",
      //     "Run and facilitate the campaign sessions with the group"
      //   ]
      // }
    ]
  );
  const [refreshProjects, setRefreshProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [searchedProject, setSearchedProject] = useState("");
  const [openProjectCreate, setOpenProjectCreate] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjects(user.uid);
        console.log(projects)
        setProjects([
          ...projects
        ]) 
      } catch (e) {
        console.log(e.message);
      }
    }

    fetchProjects();

  }, [refreshProjects, user.uid])

  const handleProjectCreateOpen = () => {
    setOpenProjectCreate(true);
  }

  return (
    <Container maxWidth="md">
      <ProjectsToolbar 
        handleCreateProjectDialogBox={handleProjectCreateOpen} 
        projects={projects} 
        searchedProject={searchedProject}
        setSearchedProject={setSearchedProject}
      />
      {(selectedProject?.id) ? (
        <ProjectDetails
          project={selectedProject}
          projects={projects}
          setSelectedProject={setSelectedProject}
          setProjects={setProjects}
        />
      ) : (
        <ProjectsList 
          projects={projects} 
          setSelectedProject={setSelectedProject} 
          searchedProject={searchedProject}
          setSearchedProject={setSearchedProject}
        />
      )}
      <ProjectCreateDialog
        open={openProjectCreate}
        setOpen={setOpenProjectCreate}
        setSelectedProject={setSelectedProject}
        refreshProjects={refreshProjects}
        setRefreshProjects={setRefreshProjects}
      />
    </Container>
  )
}

export default Projects;