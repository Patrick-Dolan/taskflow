import { TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { UserAuth } from "../../../Contexts/AuthContext";

const AccountPasswordUpdateForm = (props) => {
  const { setSnackbarOpen, setSnackbarMessage } = props;
  const { confirmUserAuth, updateUserPassword } = UserAuth();
  const [passwordUpdateError, setPasswordUpdateError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [currentPasswordForPasswordUpdate, setCurrentPasswordForPasswordUpdate] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

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
  )
}

export default AccountPasswordUpdateForm;