import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ProjectEditDialog from "./ProjectEditDialog";

const ProjectDetails = (props) => {
  const { project, projects, setProjects, setSelectedProject } = props;

  // Edit project State
  const [editedProjectName, setEditedProjectName] = useState("");
  const [editedProjectDescription, setEditedProjectDescription] = useState("");
  const [openProjectEdit, setOpenProjectEdit] = useState(false);
  
  const handleProjectEditOpen = () => {
    setOpenProjectEdit(true);
    setEditedProjectName(project?.name);
    setEditedProjectDescription(project?.description);
  }

  const handleUpdateProject = () => {
    const filteredProjects = projects.filter((p) => p.id !== project.id);
    
    // Update ProjectsList component information
    setProjects([
      ...filteredProjects,
      {
        ...project,
        name: editedProjectName,
        description: editedProjectDescription
      }
    ])

    // Updates state for details page to show new info
    setSelectedProject({
      ...project,
      name: editedProjectName,
      description: editedProjectDescription
    })
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
        <Button variant="contained" onClick={() => setSelectedProject({})}>Go Back</Button>
        <Button variant="contained" onClick={handleProjectEditOpen}>Edit</Button>
      </Box>
      <Typography variant="caption">Project Name</Typography>
      <Typography variant="h5">{project?.name}</Typography>
      <Typography variant="caption">Description</Typography>
      <Typography>{project?.description}</Typography>
      <Typography variant="caption">Tasks</Typography>
      {(project.tasks) ? (
        project?.tasks.map((task, index) => (
          <Typography key={index}>{task}</Typography>
        ))
      ) : (
          <Typography>No tasks assigned to this project.</Typography>
      )}
      <ProjectEditDialog 
        open={openProjectEdit}
        setOpen={setOpenProjectEdit}
        project={project}
        setEditedProjectName={setEditedProjectName}
        setEditedProjectDescription={setEditedProjectDescription}
        updateProject={handleUpdateProject}
      />
    </>
  )
}

export default ProjectDetails;