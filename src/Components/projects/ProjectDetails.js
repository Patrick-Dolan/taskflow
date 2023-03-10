import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ProjectEditDialog from "./ProjectEditDialog";
import ProjectDeleteDialog from "./ProjectDeleteDialog";

const ProjectDetails = (props) => {
  const { project, projects, setProjects, setSelectedProject } = props;
  const [openProjectEdit, setOpenProjectEdit] = useState(false);
  const [openProjectDelete, setOpenProjectDelete] = useState(false);
  
  const handleProjectEditOpen = () => {
    setOpenProjectEdit(true);
  }

  const handleProjectDeleteOpen = () => {
    setOpenProjectDelete(true);
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
        <Box>
          <Button variant="contained" onClick={handleProjectEditOpen} sx={{marginRight: ".5em"}}>Edit</Button>
          <Button variant="contained" onClick={handleProjectDeleteOpen}>Delete</Button>
        </Box>
      </Box>
      <Typography variant="caption">Project Name</Typography>
      <Typography variant="h5">{project?.name}</Typography>
      <Typography variant="caption">Description</Typography>
      <Typography>{(project?.description) ? `${project.description}` : "No description available."}</Typography>
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
        projects={projects}
        setProjects={setProjects}
        setSelectedProject={setSelectedProject}
      />
      <ProjectDeleteDialog 
        open={openProjectDelete}
        setOpen={setOpenProjectDelete}
        project={project}
        projects={projects}
        setProjects={setProjects}
        setSelectedProject={setSelectedProject}
      />
    </>
  )
}

export default ProjectDetails;