import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";

const ProjectsList = (props) => {
  const { projects, setSelectedProject, searchedProject } = props;
  const [timer, setTimer] = useState(false);
  const theme = useTheme();

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

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="Projects list">
        <TableHead>
          <TableRow>
            <TableCell><Typography>Project Name</Typography></TableCell>
            <TableCell><Typography>Description</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(searchedProject) ? (
            projects?.sort((a, b) => a.name === searchedProject ? -1 : b.name === searchedProject ? 1 : 0).map((project, index) => (
              // TODO replace key/id with Firebase id 
              <TableRow 
                key={project?.id || index} 
                sx={{
                  "&:hover" : { backgroundColor: theme.palette.secondary.light, border: "none" }, 
                  // Highlights searched project
                  // TODO Replace lightgreen with theme color 
                  backgroundColor: project.name === searchedProject && timer ? "lightgreen" : "none"
                }}
                onClick={() => setSelectedProject(project)}
              >
                <TableCell><Typography>{project?.name}</Typography></TableCell>
                <TableCell><Typography>{(project?.description) ? `${project.description}` : "No project description available."}</Typography></TableCell>
              </TableRow>
            ))
          ) : (
            projects?.sort((a, b) => a.name.localeCompare(b.name)).map((project, index) => (
              // TODO replace key/id with Firebase id 
              <TableRow 
                key={project?.id || index} 
                sx={{"&:hover" : { backgroundColor: theme.palette.secondary.light }}}
                onClick={() => setSelectedProject(project)}
              >
                <TableCell><Typography>{project?.name}</Typography></TableCell>
                <TableCell><Typography>{(project?.description) ? `${project.description}` : "No project description available."}</Typography></TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProjectsList;