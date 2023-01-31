import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";

const ProjectsList = (props) => {
  const { projects, setSelectedProject, searchedProject, setSearchedProject } = props;
  const [timer, setTimer] = useState(false);
  const theme = useTheme();
  const mobileScreenSize = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (searchedProject) {
      setTimer(true);
    }
  }, [searchedProject, setTimer])

  useEffect(() => {
    if(searchedProject && timer){
      setTimeout(() => {
        setTimer(false);
      }, 1500);
    }
  }, [searchedProject, timer])

  const handleProjectSelection = (project) => {
    setSelectedProject(project);
    setSearchedProject("");
  }

  if (projects.length <= 0) {
    return (<Typography variant="body1">You have no projects to display yet.</Typography>)
  } else {
    return (
      <TableContainer component={Paper}>
        <Table  aria-label="Projects list">
          {(!mobileScreenSize) ? (
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="body1">Project name</Typography></TableCell>
                <TableCell><Typography variant="body1">Description</Typography></TableCell>
              </TableRow>
            </TableHead>
          ) : null }
          <TableBody>
            {(searchedProject
                ? projects?.sort((a, b) => a.name === searchedProject ? -1 : b.name === searchedProject ? 1 : 0)
                : projects?.sort((a, b) => a.name.localeCompare(b.name))
              ).map((project, index) => (
                // TODO replace key/id with Firebase id 
                <TableRow 
                  key={project?.id || index} 
                  sx={{
                    // Highlights searched project
                    boxShadow: project?.name === searchedProject && timer ? `inset 5px 0px ${theme.palette.success.main}` : "none"
                  }}
                  onClick={() => handleProjectSelection(project)}
                  hover={true}
                >
                  <TableCell><Typography variant="body2">{project?.name}</Typography></TableCell>
                  {(!mobileScreenSize) 
                    ? <TableCell><Typography variant="body2">{(project?.description) ? `${project.description}` : "No project description available."}</Typography></TableCell>
                    : null
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

}

export default ProjectsList;