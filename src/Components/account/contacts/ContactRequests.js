import { Accordion, Typography, AccordionSummary, AccordionDetails, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper, Button, useMediaQuery, Grid, Badge } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from "@emotion/react";
import { updateUserDBEntry } from "../../../FirebaseFunctions";

const ContactRequests = (props) => {
  const { user, setUser, setSnackbarOpen, setSnackbarMessage, setSnackbarAlertSeverity } = props;
  const theme = useTheme();
  const mobileScreenSize = useMediaQuery(theme.breakpoints.down("sm"));

  const handleProfileLinkClick = () => {
    alert("Profile link clicked");
  }

  const handleContactRequestDeny = async (contactToAdd) => {
    // Filter out denied contact request to remove it from list
    const filteredContactRequests = user.contactRequests.filter(e => e.uid !== contactToAdd.uid);

    const updatedUserDetails = {
      contactRequests: [...filteredContactRequests]
    }

    try {
      await updateUserDBEntry(user, updatedUserDetails);

      // Update local user to refresh component state
      const updatedUser = {
        ...user,
        ...updatedUserDetails
      }
      setUser(updatedUser);
    } catch(e) {
      console.log(e.message);
    }
  }

  const handleContactRequestAccept = async (contactToAdd) => {
    // Filter out accepted contact request to remove it from list
    const filteredContactRequests = user.contactRequests.filter(e => e.uid !== contactToAdd.uid);

    const updatedUserDetails = {
      contacts: (user.contacts.length > 0) ? [...user.contacts, contactToAdd] : [contactToAdd],
      contactRequests: [...filteredContactRequests]
    }

    try {
      await updateUserDBEntry(user, updatedUserDetails);
      
      // Update local user to refresh component state
      const updatedUser = {
        ...user,
        ...updatedUserDetails
      }
      setUser(updatedUser);

      setSnackbarAlertSeverity("success");
      setSnackbarMessage("Contact added.");
      setSnackbarOpen(true);
    } catch(e) {
      setSnackbarAlertSeverity("error");
      setSnackbarMessage("Error adding contact to contacts.");
      setSnackbarOpen(true);
    }
  }

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Badge
            variant="dot"
            color="secondary"
          >
            <Typography>New contact requests</Typography>
          </Badge>
        </AccordionSummary>
        <AccordionDetails>
          {(user?.contactRequests.length > 0)
            ? (
              (mobileScreenSize)
                ? (
                  <>
                    {user.contactRequests.map((request) => (
                      <Accordion
                        key={request.uid}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                        >
                          <Grid container alignItems={"center"} spacing={1}>
                            <Grid item>
                              <Avatar alt={request.displayName} src={request.photoURL} />
                            </Grid>
                            <Grid item>
                              <Typography variant="body1">{request.displayName}</Typography>
                              <Typography variant="caption">{request.email}</Typography>
                            </Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container justifyContent={"space-evenly"}>
                            <Grid item>
                              <Button
                                variant="outlined"
                                size="small"
                                color="secondary"
                                onClick={handleProfileLinkClick}
                              >
                                <PersonIcon />
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                onClick={() => handleContactRequestDeny(request)}
                              >
                                <CloseIcon />
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="outlined"
                                size="small"
                                color="success"
                                onClick={() => handleContactRequestAccept(request)}
                              >
                                <CheckIcon />
                              </Button>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </>
                )
                : (
                  <List>
                    {user.contactRequests.map((request) => (
                      <Paper
                        key={request.uid}
                        sx={{
                          marginBottom: ".5em"
                        }}
                      >
                        <ListItem
                          secondaryAction={
                            <>
                              <Button 
                                variant="outlined"
                                size="small"
                                color="secondary"
                                onClick={handleProfileLinkClick}
                              >
                                <PersonIcon />
                              </Button>
                              <Button 
                                variant="outlined"
                                size="small"
                                color="error"
                                onClick={() => handleContactRequestDeny(request)}
                                sx={{
                                  marginLeft: ".25em"
                                }}
                              >
                                <CloseIcon />
                              </Button>
                              <Button 
                                variant="outlined"
                                size="small"
                                color="success"
                                onClick={() => handleContactRequestAccept(request)}
                                sx={{
                                  marginLeft: ".25em"
                                }}
                              >
                                <CheckIcon />
                              </Button>
                            </>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar alt={request.displayName} src={request.photoURL} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={request.displayName}
                            secondary={request.email}
                          />
                        </ListItem>
                      </Paper>
                    ))}
                  </List>
                )
            )
            : (
              <Typography>
                No new contact requests available.
              </Typography>
            )
          }
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default ContactRequests;