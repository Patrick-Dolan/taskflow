import { InputAdornment, TextField, Typography, Grid, LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState } from 'react';
import { getUserDetailsByUsername, updateUserDBEntry, usernameAvailable } from '../../FirebaseFunctions';
import { UserAuth } from '../../Contexts/AuthContext';

const ContactAddDialog = (props) => {
  const { open, setOpen } = props;
  const { user } = UserAuth();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameCheckingProgress, setUsernameCheckingProgress] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [usernameHelperTextMessage, setUsernameHelperTextMessage] = useState("Type in the username that you wish to add to your contacts.");

  const handleClose = () => {
    setUsername("");
    setUsernameHelperTextMessage("Type in the username that you wish to add to your contacts.");
    setUsernameError(false);
    setOpen(false);
  }

  const isUsernameValid = () => {
    setUsernameError(false);
    
    if (username.length < 4) {
      setUsernameError(true);
      setUsernameErrorMessage("Username cannot be less than 4 characters long.");
      return false;
    }
    return true;
  }

  const handleUsernameContactAdd = async () => {
    const validUsername = isUsernameValid();

    if (validUsername) {
      setUsernameHelperTextMessage("Searching for user: ");
      setUsernameCheckingProgress(true);
      try {
        const isUsernameAvailable = await usernameAvailable(username);

        if (!isUsernameAvailable) {
          // Get requested recipients firestore data to add contact request
          const requestRecipient = await getUserDetailsByUsername(username);
          const newContactRequest = {
            displayName: user.displayName,
            email: user.email,
          }
          // Check if current user has already sent a contact request to requestRecipient
          if (requestRecipient.contactRequests.some(e => e.displayName.toLowerCase() === user.displayName.toLowerCase())) {
            setUsernameCheckingProgress(false);
            setUsernameError(true);
            setUsernameErrorMessage("You have already sent a contact request to this user.");
            return
          }
          const updatedRecipient = {
            ...requestRecipient,
            contactRequests: [...requestRecipient.contactRequests, newContactRequest]
          }
          await updateUserDBEntry(requestRecipient, updatedRecipient);
          // TODO: Replace with snackbar and close dialog
          setUsernameHelperTextMessage("Contact request successful.")
          setUsernameCheckingProgress(false);
        } else {
          setUsernameCheckingProgress(false);
          setUsernameError(true);
          setUsernameErrorMessage("User does not exist.")
        }
      } catch (e) {
        setUsernameError(true);
        setUsernameErrorMessage(e.message);
      }
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>
        Add Contact
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            padding: ".5em 0"
          }}
        >
          <Grid container>
            <Grid container item>
              <TextField
                label="Add by Username"
                type="text"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={usernameError}
                helperText={(usernameError) ? usernameErrorMessage : usernameHelperTextMessage}
                InputProps={{
                  startAdornment: (
                  <InputAdornment position="start">
                    <PersonAddIcon />
                  </InputAdornment>
                  )
                }}
              />
              {(usernameCheckingProgress) 
                ? (
                  <Box sx={{width: "100%"}}>
                    <LinearProgress />
                  </Box>
                )
                : null
              }
            </Grid>
            <Grid container item>
              <Button
                variant="contained"
                onClick={handleUsernameContactAdd}
                sx={{marginTop: ".5em"}}
                fullWidth
              >
                Send contact request
              </Button>
            </Grid>
          </Grid>
        </Box>
        {/* <Typography textAlign="center" variant="body2" sx={{padding: ".5em 0"}}>Or</Typography>
        <Box
          sx={{
            padding: ".5em 0"
          }}
        >
          <Grid container>
            <Grid container item>
              <TextField
                label="Add by Email"
                type="text"
                fullWidth
                InputProps={{
                  startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid container item>
              <Button
                variant="contained"
                onClick={() => alert("Email add clicked")}
                sx={{marginTop: ".5em"}}
                fullWidth
              >
                Send contact request
              </Button>
            </Grid>
          </Grid>
        </Box> */}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClose}
          color="error"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContactAddDialog;