import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const ProjectsList = (props) => {
  const { projects, setSelectedProject } = props;
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="Projects list">
        <TableHead sx={{}}>
          <TableRow>
            <TableCell><Typography>Project Name</Typography></TableCell>
            <TableCell><Typography>Description</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects?.map((project, index) => (
            // TODO replace key/id with Firebase id 
            <TableRow 
              key={project?.id || index} 
              sx={{"&:hover" : { backgroundColor: theme.palette.secondary.light }}}
              onClick={() => setSelectedProject(project)}
            >
              <TableCell><Typography>{project?.name}</Typography></TableCell>
              <TableCell><Typography>{project?.description}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProjectsList;