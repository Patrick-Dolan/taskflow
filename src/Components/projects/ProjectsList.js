import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const ProjectsList = (props) => {
  const { projects } = props;
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="Projects list">
        <TableHead sx={{}}>
          <TableCell><Typography>Project Name</Typography></TableCell>
          <TableCell><Typography>Description</Typography></TableCell>
        </TableHead>
        <TableBody>
          {projects?.map((project, index) => (
            // TODO replace key with id when integrating firebase
            <TableRow 
              key={index} 
              sx={{"&:hover" : { backgroundColor: theme.palette.secondary.light }}}
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