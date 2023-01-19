import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

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

  const handleUserAuthDialogClose = () => {
    setOpen(false);
  };

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
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            required
          />
          <Box
            sx={{margin: "1.5em 0"}}
          >
            <Button fullWidth size="large" onClick={handleUserAuthDialogClose} variant="contained">Sign up</Button>
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
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            required
          />
          <Link style={{textDecorationColor: "grey", color: "grey"}} onClick={handleUserAuthDialogClose} to={`/PasswordRecovery`}>
            <Typography variant="caption">Forgot password?</Typography>
          </Link>
          <Box
            sx={{margin: "1.5em 0"}}
          >
            <Button fullWidth size="large" onClick={handleUserAuthDialogClose} variant="contained">Log in</Button>
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