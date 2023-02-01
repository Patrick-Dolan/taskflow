import { Container, Box } from "@mui/system";
import { Typography, Avatar, List, ListItem, ListItemAvatar, Grid, ListItemText, ListItemButton } from "@mui/material";
import { UserAuth } from "../../Contexts/AuthContext";
import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import AccountDetails from "./AccountDetails";
import AccountSettings from "./AccountSettings";
import Contacts from "./Contacts";

const Account = () => {
  const auth = UserAuth();
  const { user } = auth;
  const [showDetails, setShowDetails] = useState(true);
  const [showContacts, setShowContacts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  console.log("User in account: ", user)

  const clearConditionalWindowState = () => {
    setShowDetails(false)
    setShowContacts(false)
    setShowSettings(false)
  }

  const handleDetailsClick = () => {
    clearConditionalWindowState();
    setShowDetails(true);
  }

  const handleContactsClick = () => {
    clearConditionalWindowState();
    setShowContacts(true);
  }

  const handleSettingsClick = () => {
    clearConditionalWindowState();
    setShowSettings(true);
  }


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
              <ListItemButton onClick={handleDetailsClick}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={"My Account"} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleContactsClick}>
                <ListItemAvatar>
                  <Avatar>
                    <PeopleAltIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={"Contacts"} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleSettingsClick}>
                <ListItemAvatar>
                  <Avatar>
                    <SettingsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={"Settings"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={8} md={8} >
          {(showDetails) ? <AccountDetails /> : null}
          {(showContacts) ? <Contacts /> : null}
          {(showSettings) ? <AccountSettings /> : null}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Account;