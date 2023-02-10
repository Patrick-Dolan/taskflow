import { useTheme } from "@emotion/react";
import { Button, Typography, TextField, Divider, Paper, Snackbar, Alert } from "@mui/material"
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { UserAuth } from "../../Contexts/AuthContext";
import { updateUserAuthProfile, updateUserDBEntry, usernameAvailable } from "../../FirebaseFunctions";
import AccountDeleteForm from "./AccountDeleteForm";

const AccountEdit = (props) => {
  const { user, handleAccountEditClick } = props;
  const { updateUserEmail, updateUserPassword, confirmUserAuth } = UserAuth();
  const theme = useTheme();

  // Email update state
  const [emailUpdateError, setEmailUpdateError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentPasswordForEmailUpdate, setCurrentPasswordForEmailUpdate] = useState("");

  // Password update state
  const [passwordUpdateError, setPasswordUpdateError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [currentPasswordForPasswordUpdate, setCurrentPasswordForPasswordUpdate] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  // Username state
  const [usernameUpdateError, setUsernameUpdateError] = useState(false);
  const [usernameUpdateErrorMessage, setUsernameUpdateErrorMessage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [usernameHelperText, setUsernameHelperText] = useState("");
  
  // Shared state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  

  useEffect(() => {
    const getUsernameHelperText = (username) => {
      if (username.length === 0) {
        setUsernameHelperText("");
        return
      }
      if (username.length <= 3) {
        setUsernameHelperText("Username must be at least 4 characters long.");
        return
      }
      if (username.length >=4) {
        setUsernameHelperText("Click change username button to change username.");
        return
      }
    }

    getUsernameHelperText(newUsername);
  }, [newUsername]);
  
  const emailValidationPassed = async () => {
    setEmailUpdateError(false);
    setEmailErrorMessage("");

    if (newEmail !== confirmEmail) {
      setEmailUpdateError(true);
      setEmailErrorMessage("Email and confirm email do not match.");
      return false; 
    }

    if (newEmail.length <= 0 && confirmEmail <= 0) {
      setEmailUpdateError(true);
      setEmailErrorMessage("Email and/or confirm email can not be empty.");
      return false;
    } 

    try {
      await confirmUserAuth(currentPasswordForEmailUpdate);
    } catch(e) {
      setEmailUpdateError(true);
      switch (e.message) {
        case "Firebase: Error (auth/wrong-password).":
          setEmailErrorMessage("Current password incorrect.");
          break;
        default:
          setEmailErrorMessage(e.message);
      }
      return false;
    }

    return true;
  }

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

  const handleEmailUpdateSubmit = async (e) => {
    e.preventDefault();

    const emailFormValidated = await emailValidationPassed();

    if (!emailFormValidated) { return }

    try {
      await updateUserEmail(newEmail);
      setSnackbarOpen(true);
      setSnackbarMessage("Email updated.");
      setCurrentPasswordForEmailUpdate("");
      setNewEmail("");
      setConfirmEmail("");
    } catch (e) {
      setEmailUpdateError(true);
      switch (e.message) {
        case "Firebase: Error (auth/invalid-email).":
          setEmailErrorMessage("Email address is invalid.");
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          setEmailErrorMessage("Email address is already in use by another user.");
          break;
        default: 
        setEmailErrorMessage(e.message);
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

  const usernameValidationPassed = (username) => {
    if (username.length <= 3) {
      setUsernameUpdateError(true);
      setUsernameUpdateErrorMessage("Username must be more than 3 characters long.")
      return false;
    }
    
    if (username === user.displayName) {
      setUsernameUpdateError(true);
      setUsernameUpdateErrorMessage("Username can't be the same as current username.")
      return false;
    }

    return true;
  }

  const handleUsernameUpdateSubmit = async (e) => {
    e.preventDefault();

    const usernameValidated = usernameValidationPassed(newUsername);

    
    if (usernameValidated) {
      try {
        const availableOnFirebase = await usernameAvailable(newUsername);
        if (!availableOnFirebase) {
          setUsernameUpdateError(true);
          setUsernameUpdateErrorMessage("Username unavailable.");
          return
        }
        const userDetails = {
          displayName: newUsername,
          displayNameControl: newUsername.toLowerCase()
        }
        // Update user database entry
        await updateUserDBEntry(user, userDetails);
      // Update user auth profile with new username data
        await updateUserAuthProfile(user, userDetails.displayName);
        setNewUsername("");
        setSnackbarOpen(true);
        setSnackbarMessage("Username updated.")
      } catch (e) {
        setUsernameUpdateError(true);
        setUsernameUpdateErrorMessage(e.message);
        console.log(e.message);
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
          <form onSubmit={handleUsernameUpdateSubmit}>
            <Typography variant="body2">Update username:</Typography>
            <TextField
              type="text"
              label="New username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              margin="dense"
              error={usernameUpdateError}
              helperText={(usernameUpdateError) ? usernameUpdateErrorMessage : usernameHelperText}
              required
              fullWidth
              size="small"
            />
            <Button type="submit" variant="contained" sx={{marginTop: ".5em"}}>Change username</Button>
          </form>
        </Container>
      </Paper>
      <Paper variant="outlined" sx={{marginBottom: "1em"}}>
        <Container sx={{padding: "1em 0"}}>
          <form onSubmit={handleEmailUpdateSubmit}>
            <Typography variant="body2">Update email:</Typography>
            <TextField
              type="password"
              label="Current password"
              value={currentPasswordForEmailUpdate}
              onChange={(e) => setCurrentPasswordForEmailUpdate(e.target.value)}
              margin="dense"
              error={emailUpdateError}
              required
              fullWidth
              size="small"
            />
            <TextField
              type="email"
              label="New email*"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              margin="dense"
              error={emailUpdateError}
              fullWidth
              size="small"
              />
            <TextField
              type="email"
              label="Confirm email*"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              margin="dense"
              error={emailUpdateError}
              helperText={(emailUpdateError) ? `${emailErrorMessage}` : ""}
              fullWidth
              size="small"
            />
            <Button type="submit" variant="contained" sx={{marginTop: ".5em"}}>Change email</Button>
          </form>
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
          <AccountDeleteForm />
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