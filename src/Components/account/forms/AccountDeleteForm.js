import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import { useState } from "react";
import { UserAuth } from "../../../Contexts/AuthContext";

const AccountDeleteForm = () => {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const { deleteUserFromAuth, confirmUserAuth } = UserAuth();

  const handleClose = () => {
    setOpen(false);
    setCurrentPassword("");
  };

  const handleDialogOpen = () => {
    setOpen(true);
  }

  const handleDeleteUserAccount = async (e) => {
    e.preventDefault();
    setPasswordError(false);

    try {
      await confirmUserAuth(currentPassword);
      await deleteUserFromAuth();
    } catch (e) {
      setPasswordError(true);
      switch (e.message) {
        case "Firebase: Error (auth/wrong-password).":
          setPasswordErrorMessage("Password incorrect.");
          break;
        default:
          setPasswordErrorMessage(e.message);
      }
    }
  }

  return (
    <>
      <Typography variant="body2">Delete Account:</Typography>
      <Button 
        type="submit" 
        variant="outlined" 
        color="error"
        sx={{marginTop: ".5em"}}
        onClick={handleDialogOpen}
      >
        Delete account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Delete Account
        </DialogTitle>
        <form onSubmit={handleDeleteUserAccount}>
          <DialogContent>
            <DialogContentText>
            Deleting your account is a permanent action and cannot be undone. All your data including your projects, tasks, and contacts will be permanently deleted. Are you sure you want to continue with the deletion?
            </DialogContentText>
            <DialogContentText variant="body2" sx={{marginTop: "1em"}}>
              Confirm password to delete:
            </DialogContentText>
            <TextField
              type="password"
              label="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              margin="dense"
              error={passwordError}
              helperText={(passwordError) ? passwordErrorMessage : ""}
              required
              fullWidth
              size="small"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="error"
            >
              delete account
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default AccountDeleteForm;