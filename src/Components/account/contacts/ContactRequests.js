import { Accordion, Typography, AccordionSummary, AccordionDetails, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper, Button, useMediaQuery, Grid } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from "@emotion/react";

const ContactRequests = (props) => {
  const { user } = props;
  const theme = useTheme();
  const mobileScreenSize = useMediaQuery(theme.breakpoints.down("sm"));

  const handleProfileLinkClick = () => {
    alert("Profile link clicked");
  }

  const handleContactRequestAccept = () => {
    alert("Request accept clicked");
  }

  const handleContactRequestDeny = () => {
    alert("Request denied clicked");
  }

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>New contact requests</Typography>
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
                                onClick={handleProfileLinkClick}
                              >
                                <PersonIcon />
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={handleContactRequestDeny}
                              >
                                <CloseIcon />
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={handleContactRequestAccept}
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
                                onClick={handleProfileLinkClick}
                              >
                                <PersonIcon />
                              </Button>
                              <Button 
                                variant="outlined"
                                size="small"
                                onClick={handleContactRequestDeny}
                                sx={{
                                  marginLeft: ".25em"
                                }}
                              >
                                <CloseIcon />
                              </Button>
                              <Button 
                                variant="outlined"
                                size="small"
                                onClick={handleContactRequestAccept}
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