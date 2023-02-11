import { Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { updateUserDBEntry, updateUserAuthProfile, usernameAvailable } from "../../../FirebaseFunctions";

const AccountUsernameUpdateForm = (props) => {
  const { user, setSnackbarOpen, setSnackbarMessage } = props;
  const [usernameUpdateError, setUsernameUpdateError] = useState(false);
  const [usernameUpdateErrorMessage, setUsernameUpdateErrorMessage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [usernameHelperText, setUsernameHelperText] = useState("");

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

  const usernameValidationPassed = (username) => {
    setUsernameUpdateError(false);

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
  )
}

export default AccountUsernameUpdateForm;