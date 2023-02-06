import { useTheme } from "@emotion/react";
import { Button, Typography, TextField, Divider, Paper, Snackbar, Alert } from "@mui/material"
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { UserAuth } from "../../Contexts/AuthContext";

const AccountEdit = (props) => {
  const { handleAccountEditClick } = props;
  const theme = useTheme();
  const { updateUserEmail, updateUserPassword, confirmUserAuth } = UserAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [emailUpdateError, setEmailUpdateError] = useState(false);
  const [passwordUpdateError, setPasswordUpdateError] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const emailValidationPassed = () => {
    setEmailUpdateError(false);
    setErrorMessage("");

    if (newEmail !== confirmEmail) {
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

  const passwordValidationPassed = async () => {
    setPasswordUpdateError(false);
    setErrorMessage("");
    
    if (newPassword !== newPasswordConfirm) {
      setPasswordUpdateError(true);
      setErrorMessage("New passwords do not match.");
      return false; 
    }
    
    if (newPassword === newPasswordConfirm && newPassword === currentPassword) {
      setPasswordUpdateError(true);
      setErrorMessage("New password cannot be the same as the current password. Please choose a new password.");
      return false; 
    }
    
    try {
      await confirmUserAuth(currentPassword);
    } catch(e) {
      setPasswordUpdateError(true);
      switch (e.message) {
        case "Firebase: Error (auth/wrong-password).":
          setErrorMessage("Old password incorrect.");
          break;
        default:
          setErrorMessage(e.message);
      }
    }
    return true;
  }

  const handleEmailUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!emailValidationPassed()) { return }

    try {
      await updateUserEmail(newEmail);
      setSnackbarOpen(true);
      setSnackbarMessage("Email updated.")
      setNewEmail("");
      setConfirmEmail("");
    } catch (e) {
      setEmailUpdateError(true);
      switch (e.message) {
        case "Firebase: Error (auth/invalid-email).":
          setErrorMessage("Email address is invalid.");
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          setErrorMessage("Email address is already in use by another user.");
          break;
        default: 
        setErrorMessage(e.message);
      }
    }
  }

  const handlePasswordUpdateSubmit = async (e) => {
    e.preventDefault();

    const passwordValidated = await passwordValidationPassed();

    if (!passwordValidated) { return }

    try {
      await updateUserPassword(newPassword);
      setSnackbarOpen(true);
      setSnackbarMessage("Password updated.")
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
    } catch (e) {
      setPasswordUpdateError(true);
      switch (e.message) {
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          setErrorMessage("Password should be at least 6 characters long.");
          break;
        default:
          setErrorMessage(e.message);
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
            <Button type="submit" variant="contained">Change email</Button>
          </form>
        </Container>
      </Paper>
      <Paper variant="outlined">
        <Container sx={{padding: "1em 0"}}>
          <form onSubmit={handlePasswordUpdateSubmit}>
            <Typography variant="body2">Update password:</Typography>
            <TextField
              type="password"
              label="Current password*"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              margin="normal"
              error={passwordUpdateError}
              required
              fullWidth
              size="small"
              />
            <TextField
              type="password"
              label="New password*"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
              error={passwordUpdateError}
              required
              fullWidth
              size="small"
              />
            <TextField
              type="password"
              label="Confirm new password*"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              margin="normal"
              error={passwordUpdateError}
              helperText={(passwordUpdateError) ? `${errorMessage}` : ""}
              required
              fullWidth
              size="small"
            />
            <Button type="submit" variant="contained">Change password</Button>
          </form>
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