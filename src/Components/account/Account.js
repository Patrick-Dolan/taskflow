import { Container } from "@mui/system";
import { Typography } from "@mui/material";

// Temp Components
import RegisterUser from "../tempAuth/RegisterUser";
import AccountOptions from "../tempAuth/AccountOptions";

const Account = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4">Account placeholder</Typography>
      {/* Temp Components */}
      <RegisterUser />
      <AccountOptions />
      {/* --------------- */}
    </Container>
  )
}

export default Account;