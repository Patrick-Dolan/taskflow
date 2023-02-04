import { useTheme } from "@emotion/react";
import { Button, Typography, TextField, Divider, Paper, Snackbar, Alert } from "@mui/material"
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { UserAuth } from "../../Contexts/AuthContext";

const AccountEdit = (props) => {
  const { handleAccountEditClick } = props;
  const theme = useTheme();
  const { updateUserEmail } = UserAuth();
  const [emailUpdateError, setEmailUpdateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const emailValidationPassed = () => {
    setEmailUpdateError(false);
    setErrorMessage("");

    if (newEmail.trim() !== confirmEmail.trim()) {
      setEmailUpdateError(true);
      setErrorMessage("Email and confirm email do not match.");
      return false; 
    }

    if (newEmail.length <= 0 && confirmEmail <= 0) {
      setEmailUpdateError(true);
      setErrorMessage("Email and/or confirm email can not be empty.");
      return false;
    } 

    return true;
  }

  const handleEmailUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!emailValidationPassed()) {
      return
    }

    try {
      await updateUserEmail(newEmail);
      setSnackbarOpen(true);
      setSnackbarMessage("Email updated.")
      setNewEmail("");
      setConfirmEmail("");
    } catch (e) {
      console.log(e)
      setEmailUpdateError(true);
      if (e.message === "Firebase: Error (auth/invalid-email).") {
        setErrorMessage("Email address is invalid.");
      }
      if (e.message === "Firebase: Error (auth/email-already-in-use).") {
        setErrorMessage("Email address is already in use by another user.");
      }
    }
  }

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
      <Paper variant="outlined">
        <Container sx={{padding: "1em 0"}}>
          <form onSubmit={handleEmailUpdateSubmit}>
            <Typography variant="body2">Update email:</Typography>
            <TextField
              type="email"
              label="New email*"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              margin="normal"
              error={emailUpdateError}
              fullWidth
              size="small"
              />
            <TextField
              type="email"
              label="Confirm email*"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              margin="normal"
              error={emailUpdateError}
              helperText={(emailUpdateError) ? `${errorMessage}` : ""}
              fullWidth
              size="small"
            />
            <Button type="submit" variant="contained">Update email</Button>
          </form>
        </Container>
      </Paper>
      <Snackbar
        open={snackbarOpen} 
        autoHideDuration={6000}
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