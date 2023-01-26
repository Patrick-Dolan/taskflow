import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { UserAuth } from '../../Contexts/AuthContext';
import { useState } from 'react';

const UserAuthDialog = (props) => {

  // ===========================================================================================
  // !!! THE FOLLOWING COMMENT CODE IS TO BE PUT IN THE PARENT COMPONENT TO OPEN THIS DIALOG !!!

  // const [openUserAuthDialog, setOpenUserAuthDialog] = useState(false);

  // const handleUserAuthDialogClickOpen = () => {
  //   setOpenUserAuthDialog(true);
  // };

  // This is an example of how to open the dialog
  // <Button variant="outlined" onClick={handleUserAuthDialogClickOpen}>
  //   Open form dialog
  // </Button>

  // ===========================================================================================

  const { open, setOpen, type, toggleLoginSignup } = props;
  const { signIn, registerUser } = UserAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register State
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirmation, setRegisterPasswordConfirmation] = useState("");

  // Shared Auth state
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const clearErrors = () => {
    setEmailError(false);
    setEmailErrorMessage("");
    setPasswordError(false);
    setPasswordErrorMessage("");
  }

  const handleUserAuthDialogClose = () => {
    clearErrors();
    setOpen(false);
  };

  const passwordsDifferent = () => {
    if (registerPassword !== registerPasswordConfirmation) {
      setPasswordError(true);
      setPasswordErrorMessage("Passwords do not match.");
      return true;
    }
    setPasswordError(false);
    return false;
  }

  const handleRegisterAccount = async (e) => {
    e.preventDefault();
    clearErrors();

    if (passwordsDifferent()) {
      return;
    }

    try {
      await registerUser(registerEmail, registerPassword);
      handleUserAuthDialogClose();
    } catch (e) {
      if (e.code === "auth/invalid-email") {
        setEmailError(true);
        setEmailErrorMessage("Invalid email address.");
      }
      if (e.code === "auth/weak-password") {
        setPasswordError(true);
        setPasswordErrorMessage("Password must be at least 6 characters long.")
      } else {
        console.log("Register User Error: ", e.code);
        console.log("Register User Error: ", e.message);
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(loginEmail, loginPassword);
      handleUserAuthDialogClose();
    } catch (e) {
      console.log("Sign in User Error: ", e.message);
    }
  }

  if (type === "Sign up") {
    return (
      <Dialog open={open} onClose={handleUserAuthDialogClose}>
        <Typography variant="h4" sx={{textAlign: "center", padding: "1em 0 0 0"}}>Sign up</Typography>
        <DialogContent>
          <form onSubmit={handleRegisterAccount}>
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              error={emailError}
              helperText={(emailError) ? `${emailErrorMessage}` : ""}
              onChange={(e) => setRegisterEmail(e.target.value)}
              />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              error={passwordError}
              required
              onChange={(e) => setRegisterPassword(e.target.value)}
              />
            <TextField
              margin="dense"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              error={passwordError}
              helperText={(passwordError) ? `${passwordErrorMessage}` : ""}
              required
              onChange={(e) => setRegisterPasswordConfirmation(e.target.value)}
            />
            <Box
              sx={{margin: "1.5em 0"}}
            >
              <Button fullWidth type="submit" size="large" variant="contained">Sign up</Button>
            </Box>
          </form>
          <Typography sx={{color: "grey"}} variant="caption">Already have an account? </Typography>
          <Link style={{textDecorationColor: "grey", color: "grey"}}>
            <Typography sx={{color: "grey"}} variant="caption" onClick={toggleLoginSignup}>Sign up here!</Typography>
          </Link>
        </DialogContent>
      </Dialog>
    );
  } else if (type === "Log in") {
    return (
      <Dialog open={open} onClose={handleUserAuthDialogClose}>
        <Typography variant="h4" sx={{textAlign: "center", padding: "1em 0 0 0"}}>Log in</Typography>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            required
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            required
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Link style={{textDecorationColor: "grey", color: "grey"}} onClick={handleUserAuthDialogClose} to={`/PasswordRecovery`}>
            <Typography variant="caption">Forgot password?</Typography>
          </Link>
          <Box
            sx={{margin: "1.5em 0"}}
          >
            <Button fullWidth size="large" onClick={handleLogin} variant="contained">Log in</Button>
          </Box>
          <Typography variant="caption">Don't have an account yet? </Typography>
          <Link style={{textDecorationColor: "grey", color: "grey"}} onClick={toggleLoginSignup}>
            <Typography variant="caption">Register here!</Typography>
          </Link>
        </DialogContent>
      </Dialog>
    );
  }
}

export default UserAuthDialog;