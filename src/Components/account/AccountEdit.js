import { useTheme } from "@emotion/react";
import { Button, Typography, Divider, Paper, Snackbar, Alert } from "@mui/material"
import { Box, Container } from "@mui/system";
import { useState } from "react";
import AccountDeleteForm from "./forms/AccountDeleteForm";
import AccountEmailUpdateForm from "./forms/AccountEmailUpdateForm";
import AccountPasswordUpdateForm from "./forms/AccountPasswordUpdateForm";
import AccountUsernameUpdateForm from "./forms/AccountUsernameUpdateForm";

const AccountEdit = (props) => {
  const { user, handleAccountEditClick } = props;
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  return (
    <>
      <Divider><Typography variant="h4">Edit Account</Typography></Divider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1em",
          marginBottom: ".25em"
        }}
      >
        <Typography variant="h5">Account information</Typography>
        <Button 
          onClick={handleAccountEditClick}
          size="small"
          variant="outlined"
        >Back</Button>
      </Box>
      <Divider sx={{marginBottom: "1em"}} />
      <Paper variant="outlined" sx={{marginBottom: "1em"}}>
        <Container sx={{padding: "1em 0"}}>
          <AccountUsernameUpdateForm 
            user={user}
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage}
          />
        </Container>
      </Paper>
      <Paper variant="outlined" sx={{marginBottom: "1em"}}>
        <Container sx={{padding: "1em 0"}}>
          <AccountEmailUpdateForm 
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage}
          />
        </Container>
      </Paper>
      <Paper variant="outlined" sx={{marginBottom: "1em"}}>
        <Container sx={{padding: "1em 0"}}>
          <AccountPasswordUpdateForm 
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage}
          />
        </Container>
      </Paper>
      <Paper variant="outlined" sx={{marginBottom: "1em"}}>
        <Container sx={{padding: "1em 0"}}>
          <AccountDeleteForm
            user={user}
          />
        </Container>
      </Paper>
      <Snackbar
        open={snackbarOpen} 
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert 
          severity="success" 
          sx={{
          backgroundColor: theme.palette.success.light
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AccountEdit;