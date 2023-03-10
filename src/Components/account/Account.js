import { Container, Box } from "@mui/system";
import { Typography, Avatar, List, ListItem, ListItemAvatar, Grid, ListItemText, ListItemButton, useMediaQuery, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { UserAuth } from "../../Contexts/AuthContext";
import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import AccountDetails from "./AccountDetails";
import AccountEdit from "./AccountEdit";
import { useTheme } from "@emotion/react";
import Settings from "../settings/Settings";

const Account = () => {
  const auth = UserAuth();
  const { user } = auth;
  const theme = useTheme();
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [showDetails, setShowDetails] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showAccountEdit, setShowAccountEdit] = useState(false);
  const mobileScreenSize = useMediaQuery(theme.breakpoints.down("sm"));
  
  const clearConditionalWindowState = () => {
    setShowDetails(false);
    setShowSettings(false);
    setShowAccountEdit(false);
  }

  const handleDetailsClick = () => {
    clearConditionalWindowState();
    setBottomNavValue(0);
    setShowDetails(true);
  }
  
  const handleSettingsClick = () => {
    clearConditionalWindowState();
    setBottomNavValue(1);
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
          {(!mobileScreenSize) 
            ? (
              <>
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
                <Typography variant="h5" sx={{margin: ".25em auto 0 auto"}}>{user.displayName ? `@${user.displayName}` : "No display name"}</Typography>
                <List sx={{width: "100%"}}>
                  <ListItem>
                    <ListItemButton onClick={handleDetailsClick}>
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={"Account"} />
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
              </>
            )
            : (null)
          }
        </Grid>
        <Grid item xs={12} sm={8} md={8} sx={{paddingBottom: {xs: "5em"}}} elevation={1}>
          {(showDetails) ? <AccountDetails user={user} handleAccountEditClick={handleAccountEditClick} /> : null}
          {(showSettings) ? <Settings /> : null}
          {(showAccountEdit) ? <AccountEdit user={user} handleAccountEditClick={handleAccountEditClick} /> : null}
        </Grid>
      </Grid>
      {(mobileScreenSize) 
        ? (
          <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={5}>
            <BottomNavigation
              showLabels
              value={bottomNavValue}
              onChange={(event, newValue) => {
                setBottomNavValue(newValue);
              }}
            >
              <BottomNavigationAction label="Account" icon={<PersonIcon />} onClick={handleDetailsClick} />
              <BottomNavigationAction label="Settings" icon={<SettingsIcon />} onClick={handleSettingsClick} />
            </BottomNavigation>
          </Paper>
        )
        : (null)
      }
    </Container>
  )
}

export default Account;