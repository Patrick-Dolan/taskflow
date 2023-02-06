import { Button, Grid, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";


const AccountDetails = (props) => {
  const { user, handleAccountEditClick } = props;

  return (
    <>
      <Divider><Typography variant="h4">My Account</Typography></Divider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1em",
          marginBottom: ".25em"
        }}
      >
        <Typography variant="h5">Account information</Typography>
        <Button 
          onClick={handleAccountEditClick}
          size="small"
          variant="outlined"
        >Edit account</Button>
      </Box>
      <Divider sx={{marginBottom: "1em"}} />
      <Grid container direction="column" spacing={3}>
        <Grid container item>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Typography variant="subtitle2">Username:</Typography>
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9}>
            <Typography variant="body1">{user.displayName}</Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Typography variant="subtitle2">Email:</Typography>
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9}>
            <Typography variant="body1">{user.email}</Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Typography variant="subtitle2">Password:</Typography>
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9}>
            <Typography variant="body1">********</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2em",
          marginBottom: ".25em"
        }}
      >
        <Typography variant="h5">Profile information</Typography>
        <Button 
          onClick={handleAccountEditClick}
          size="small"
          variant="outlined"
        >Edit profile</Button>
      </Box>
      <Divider sx={{marginBottom: "1em"}} />
      <Grid container direction="column" spacing={3}>
        <Grid container item>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Typography variant="subtitle2">First name:</Typography>
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9}>
            <Typography variant="body1">{user.firstName ? user.firstName : "No first name available."}</Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Typography variant="subtitle2">Last name:</Typography>
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9}>
            <Typography variant="body1">{user.lastName ? user.lastName : "No last name available."}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default AccountDetails;