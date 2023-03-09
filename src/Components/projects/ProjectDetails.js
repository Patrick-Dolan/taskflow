import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ProjectEditDialog from "./ProjectEditDialog";
import ProjectDeleteDialog from "./ProjectDeleteDialog";
import TasksList from "../tasks/TasksList";

const ProjectDetails = (props) => {
  const { project, setSelectedProject, refreshProjectsList } = props;
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
      {(project?.tasks && project?.tasks?.length > 0) ? (
        <TasksList 
          tasks={project.tasks}
        />
      ) : (
          <Typography>No tasks assigned to this project.</Typography>
      )}
      <ProjectEditDialog 
        open={openProjectEdit}
        setOpen={setOpenProjectEdit}
        project={project}
        setSelectedProject={setSelectedProject}
        refreshProjectsList={refreshProjectsList}
      />
      <ProjectDeleteDialog 
        open={openProjectDelete}
        setOpen={setOpenProjectDelete}
        project={project}
        refreshProjectsList={refreshProjectsList}
        setSelectedProject={setSelectedProject}
      />
    </>
  )
}

export default ProjectDetails;