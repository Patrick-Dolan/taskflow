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
import AccountEdit from "./AccountEdit";

const Account = () => {
  const auth = UserAuth();
  const { user } = auth;
  const [showDetails, setShowDetails] = useState(true);
  const [showContacts, setShowContacts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAccountEdit, setShowAccountEdit] = useState(false);

  const clearConditionalWindowState = () => {
    setShowDetails(false);
    setShowContacts(false);
    setShowSettings(false);
    setShowAccountEdit(false);
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
  
  const handleAccountEditClick = () => {
    if(showAccountEdit) {
      clearConditionalWindowState();
      setShowAccountEdit(false);
      setShowDetails(true);
    } else {
      clearConditionalWindowState();
      setShowAccountEdit(true);
    }
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid container direction="column" item xs={12} sm={4} md={4}>
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
          <Typography variant="h5" sx={{margin: ".25em auto 0 auto"}}>{user.displayName ? user.displayName : "No display name"}</Typography>
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
          {(showDetails) ? <AccountDetails user={user} handleAccountEditClick={handleAccountEditClick} /> : null}
          {(showContacts) ? <Contacts /> : null}
          {(showSettings) ? <AccountSettings /> : null}
          {(showAccountEdit) ? <AccountEdit user={user} handleAccountEditClick={handleAccountEditClick} /> : null}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Account;