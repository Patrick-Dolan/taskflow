import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { UserAuth } from "../../../Contexts/AuthContext";

const AccountEmailUpdateForm = (props) => {
  const { setSnackbarOpen, setSnackbarMessage } = props;
  const { updateUserEmail, confirmUserAuth } = UserAuth();
  const [emailUpdateError, setEmailUpdateError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentPasswordForEmailUpdate, setCurrentPasswordForEmailUpdate] = useState("");

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

  return (
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
  )
}

export default AccountEmailUpdateForm;