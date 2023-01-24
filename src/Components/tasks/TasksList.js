import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";

const TasksList = (props) => {
  const theme = useTheme();
  const { tasks, searchedTask, setSearchedTask, setSelectedTask } = props;
  const [timer, setTimer] = useState(false);

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

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="Tasks list">
        <TableHead>
          <TableRow>
            <TableCell><Typography>Task</Typography></TableCell>
            <TableCell><Typography>Description</Typography></TableCell>
            <TableCell align="right"><Typography>Due date</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(searchedTask) ? (
            tasks?.sort((a, b) => a.name === searchedTask ? -1 : b.name === searchedTask ? 1 : 0).map((task, index) => (
              // TODO replace key/id with Firebase id 
              <TableRow 
                key={task?.id || index} 
                sx={{"&:hover" : { backgroundColor: theme.palette.secondary.light, border: "none" },
                backgroundColor: task?.name === searchedTask && timer ? theme.palette.success.main : "none"
              }}
                // onClick={() => handleTaskSelection(task)}
              >
                <TableCell><Typography variant="body2">{task?.name}</Typography></TableCell>
                <TableCell><Typography variant="body2">{(task?.description) ? `${task.description.slice(0, 50).trim()}...` : "No task description available."}</Typography></TableCell>
                <TableCell align="right"><Typography variant="body2">{(task?.dueDate) ? `${task.dueDate.format("MM-DD-YY")}` : "No due date."}</Typography></TableCell>
              </TableRow>
            ))
          ) : (
            tasks?.sort((a, b) => a.name.localeCompare(b.name)).map((task, index) => (
              // TODO replace key/id with Firebase id 
              <TableRow 
                key={task?.id || index} 
                sx={{"&:hover" : { backgroundColor: theme.palette.secondary.light }}}
                // onClick={() => handleTaskSelection(task)}
              >
                <TableCell><Typography variant="body2">{task?.name}</Typography></TableCell>
                <TableCell><Typography variant="body2">{(task?.description) ? `${task.description.slice(0, 50).trim()}...` : "No task description available."}</Typography></TableCell>
                <TableCell align="right"><Typography variant="body2">{(task?.dueDate) ? `${task.dueDate.format("MM-DD-YY")}` : "No due date."}</Typography></TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TasksList;