import { 
  TableContainer, 
  Paper, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  Typography, 
  TableBody, 
  TableFooter, 
  TablePagination,
  Box,
  IconButton, 
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Avatar,
  Divider
  } from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import PendingIcon from '@mui/icons-material/Pending';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";

const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const TasksList = (props) => {
  const { tasks, searchedTask, setSearchedTask, setSelectedTask } = props;
  const theme = useTheme();
  const mobileScreenSize = useMediaQuery(theme.breakpoints.down("sm"));
  const [timer, setTimer] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;

  useEffect(() => {
    if (searchedTask) {
      setTimer(true);
    }
  }, [searchedTask, setTimer])

  useEffect(() => {
    if(searchedTask && timer){
      setTimeout(() => {
        setTimer(false);
      }, 1500);
    }
  }, [searchedTask, timer])

  const handleTaskSelection = (task) => {
    setSelectedTask(task);
    setSearchedTask("");
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (mobileScreenSize) {
    return (
      <>
        <List>
          {(searchedTask
            ? tasks.sort((a, b) => a.name === searchedTask ? -1 : b.name === searchedTask ? 1 : 0)
            : tasks.sort((a, b) => a.name.localeCompare(b.name))
            ).map((task, index) => (
            <Box key={task?.id || index}>
              <ListItem
                onClick={() => handleTaskSelection(task)}
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar sx={{backgroundColor: (task?.taskCompleted ? theme.palette.success.main : theme.palette.secondary.main)}}>
                      {(task?.taskCompleted) ? <CheckIcon /> : <MoreHorizIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={task.name} secondary={task?.description ? `${task?.description.slice(0, 30).trim()}...` : "No description available."}></ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </>
    )
  } else {
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="Tasks list">
          <TableHead>
            <TableRow>
              <TableCell align="center"><Typography>Status</Typography></TableCell>
              <TableCell><Typography>Task</Typography></TableCell>
              <TableCell><Typography>Description</Typography></TableCell>
              <TableCell align="right"><Typography>Due date</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(searchedTask) ? (
              (rowsPerPage > 0
                ? tasks.sort((a, b) => a.name === searchedTask ? -1 : b.name === searchedTask ? 1 : 0).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : tasks.sort((a, b) => a.name === searchedTask ? -1 : b.name === searchedTask ? 1 : 0)
                ).map((task, index) => (
                // TODO replace key/id with Firebase id 
                <TableRow 
                  key={task?.id || index} 
                  sx={{
                    boxShadow: task?.name === searchedTask && timer ? `inset 5px 0px ${theme.palette.success.main}` : "none"
                  }}
                  hover={true}
                  onClick={() => handleTaskSelection(task)}
                >
                  <TableCell align="center">{(task?.taskCompleted) ? <CheckCircleIcon color="success" /> : <PendingIcon sx={{color: theme.palette.secondary.main}} />}</TableCell>
                  <TableCell><Typography variant="body2">{task?.name}</Typography></TableCell>
                  <TableCell><Typography variant="body2">{(task?.description) ? `${task.description.slice(0, 50).trim()}...` : "No task description available."}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2">{(task?.dueDate) ? `${task.dueDate.format("MM-DD-YY")}` : "No due date."}</Typography></TableCell>
                </TableRow>
              ))
            ) : (
              (rowsPerPage > 0
                ? tasks.sort((a, b) => a.name.localeCompare(b.name)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : tasks.sort((a, b) => a.name.localeCompare(b.name))
                ).map((task, index) => (
                // TODO replace key/id with Firebase id 
                <TableRow 
                  key={task?.id || index} 
                  onClick={() => handleTaskSelection(task)}
                  hover={true}
                >
                  <TableCell align="center">{(task?.taskCompleted) ? <CheckCircleIcon color="success" /> : <PendingIcon sx={{color: theme.palette.secondary.main}} />}</TableCell>
                  <TableCell><Typography variant="body2">{task?.name}</Typography></TableCell>
                  <TableCell><Typography variant="body2">{(task?.description) ? `${task.description.slice(0, 50).trim()}...` : "No task description available."}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2">{(task?.dueDateAssigned) ? `${task.dueDate.format("MM-DD-YY")}` : "No due date."}</Typography></TableCell>
                </TableRow>
              ))
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination 
                rowsPerPageOptions={[10, 15, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={tasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    )
  }
}

export default TasksList;