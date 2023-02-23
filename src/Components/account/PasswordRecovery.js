import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { UserAuth } from "../../Contexts/AuthContext";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Box } from "@mui/system";
import { Button } from "@mui/material";


const PasswordRecovery = () => {
  const { passwordResetEmail } = UserAuth();
  const [passwordEmail, setPasswordEmail] = useState("");


  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      await passwordResetEmail(passwordEmail);
      // TODO set up snackbar for password reset
      console.log("Password Reset Email Sent");
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <Container maxWidth="md">
      <Box>
        <Typography variant="h4">Password Recovery placeholder</Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          required
          onChange={(e) => setPasswordEmail(e.target.value)}
        />
        <Button fullWidth size="large" onClick={handlePasswordReset} variant="contained">Send password reset email</Button>
      </Box>
    </Container>
  )
}

export default PasswordRecovery;