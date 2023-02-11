import { useTheme } from "@emotion/react";
import { Button, Typography, TextField, Divider, Paper, Snackbar, Alert } from "@mui/material"
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { UserAuth } from "../../Contexts/AuthContext";
import AccountDeleteForm from "./forms/AccountDeleteForm";
import AccountEmailUpdateForm from "./forms/AccountEmailUpdateForm";
import AccountUsernameUpdateForm from "./forms/AccountUsernameUpdateForm";

const AccountEdit = (props) => {
  const { user, handleAccountEditClick } = props;
  const { updateUserPassword, confirmUserAuth } = UserAuth();
  const theme = useTheme();

  // Password update state
  const [passwordUpdateError, setPasswordUpdateError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [currentPasswordForPasswordUpdate, setCurrentPasswordForPasswordUpdate] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  
  // Shared state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const passwordValidationPassed = async () => {
    setPasswordUpdateError(false);
    setPasswordErrorMessage("");
    
    if (newPassword !== newPasswordConfirm) {
      setPasswordUpdateError(true);
      setPasswordErrorMessage("New passwords do not match.");
      return false; 
    }
    
    if (newPassword === newPasswordConfirm && newPassword === currentPasswordForPasswordUpdate) {
      setPasswordUpdateError(true);
      setPasswordErrorMessage("New password cannot be the same as the current password. Please choose a new password.");
      return false; 
    }
    
    try {
      await confirmUserAuth(currentPasswordForPasswordUpdate);
    } catch(e) {
      setPasswordUpdateError(true);
      switch (e.message) {
        case "Firebase: Error (auth/wrong-password).":
          setPasswordErrorMessage("Current password incorrect.");
          break;
        default:
          setPasswordErrorMessage(e.message);
      }
      return false;
    }
    return true;
  }

  const handlePasswordUpdateSubmit = async (e) => {
    e.preventDefault();

    const passwordValidated = await passwordValidationPassed();

    if (!passwordValidated) { return }

    try {
      await updateUserPassword(newPassword);
      setSnackbarOpen(true);
      setSnackbarMessage("Password updated.")
      setCurrentPasswordForPasswordUpdate("");
      setNewPassword("");
      setNewPasswordConfirm("");
    } catch (e) {
      setPasswordUpdateError(true);
      switch (e.message) {
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          setPasswordErrorMessage("Password should be at least 6 characters long.");
          break;
        default:
          setPasswordErrorMessage(e.message);
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
          <form onSubmit={handlePasswordUpdateSubmit}>
            <Typography variant="body2">Update password:</Typography>
            <TextField
              type="password"
              label="Current password"
              value={currentPasswordForPasswordUpdate}
              onChange={(e) => setCurrentPasswordForPasswordUpdate(e.target.value)}
              margin="dense"
              error={passwordUpdateError}
              required
              fullWidth
              size="small"
              />
            <TextField
              type="password"
              label="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="dense"
              error={passwordUpdateError}
              required
              fullWidth
              size="small"
              />
            <TextField
              type="password"
              label="Confirm new password"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              margin="dense"
              error={passwordUpdateError}
              helperText={(passwordUpdateError) ? `${passwordErrorMessage}` : ""}
              required
              fullWidth
              size="small"
            />
            <Button type="submit" variant="contained" sx={{marginTop: ".5em"}}>Change password</Button>
          </form>
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