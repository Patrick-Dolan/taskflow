import { Container, Box } from "@mui/system";
import { Typography, Snackbar, Alert, Button, TextField } from "@mui/material";
import { UserAuth } from "../../Contexts/AuthContext";
import { useState } from "react";
import { useTheme } from "@emotion/react";


const PasswordRecovery = () => {
  const theme = useTheme();
  const { passwordResetEmail } = UserAuth();
  const [passwordEmail, setPasswordEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState("success")


  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      await passwordResetEmail(passwordEmail);

      // Notify User of success or error of passwordResetEmail
      setSnackbarAlertSeverity("success")
      setSnackbarMessage("Password reset email sent successfully.")
      setSnackbarOpen(true);
    } catch (e) {
      setSnackbarAlertSeverity("error")
      setSnackbarMessage(`Password reset email error: ${e.message}`)
      setSnackbarOpen(true);
    }
  }

  return (
    <Container maxWidth="md">
      <Box>
        <Typography variant="h4">Password Recovery</Typography>
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
      <Snackbar
        open={snackbarOpen} 
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert 
          severity={snackbarAlertSeverity} 
          sx={{
          backgroundColor: (snackbarAlertSeverity === "success") ? theme.palette.success.light : theme.palette.error.light
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default PasswordRecovery;