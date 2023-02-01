import { Box, Container } from "@mui/system";
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Typography } from "@mui/material";
import { UserAuth } from "../../Contexts/AuthContext";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Profile = () => {
  const auth = UserAuth();
  const { user } = auth;
  console.log("User in profile: ", user)

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid container direction="column" alignItems="center" justifyContent="center" item xs={12} sm={4} md={4}>
          <Box
            style={{
              display: "flex", 
              justifyContent: "center",
              marginTop: "1em"
            }}
          >
            <Avatar
              sx={{
                minHeight: "8em",
                minWidth: "8em",
              }}
            />
          </Box>
          <Typography variant="h5" sx={{marginTop: ".25em"}}>{user.displayName ? user.displayName : "No display name"}</Typography>
          <List sx={{width: "100%"}}>
            <ListItem>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    <PeopleAltIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={"Contacts"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={8} md={8} >
          <Typography variant="h4">Profile main info</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile;