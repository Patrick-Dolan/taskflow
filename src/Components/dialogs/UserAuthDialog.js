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
  const [registerEmail, setRegisterEmail] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [error, setError] = useState("")

  const handleUserAuthDialogClose = () => {
    setOpen(false);
  };

  const handleRegisterAccount = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(registerEmail, passwordRegister);
      handleUserAuthDialogClose();
    } catch (e) {
      setError(e.message);
      console.log("Register User Error: ", error);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(loginEmail, loginPassword);
      handleUserAuthDialogClose();
    } catch (e) {
      setError(e.message);
      console.log("Sign in User Error: ", error);
    }
  }

  if (type === "Sign up") {
    return (
      <Dialog open={open} onClose={handleUserAuthDialogClose}>
        <Typography variant="h4" sx={{textAlign: "center", padding: "1em 0 0 0"}}>Sign up</Typography>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            required
            onChange={(e) => setRegisterEmail(e.target.value)}
            />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            required
            onChange={(e) => setPasswordRegister(e.target.value)}
          />
          {/* TODO: Setup password confirmation */}
          {/* <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            required
          /> */}
          <Box
            sx={{margin: "1.5em 0"}}
          >
            <Button fullWidth size="large" onClick={handleRegisterAccount} variant="contained">Sign up</Button>
          </Box>
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