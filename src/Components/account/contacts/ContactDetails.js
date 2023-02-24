import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { Container, Box } from "@mui/system";

const ContactDetails = (props) => {
  const { contact, goBackToContactsList, deleteContact } = props;

  return (
    <>
      <Button 
        onClick={goBackToContactsList}
        variant="contained"
      >
        Go back
      </Button>
      <Paper sx={{marginTop: "1em"}}>
        <Container sx={{padding: "2em 0"}}>
          <Grid 
            container
            spacing={2}
          >
            <Grid item xs={12} sm={12} md={3}>
              <Avatar
                sx={{
                  minHeight: "5em",
                  minWidth: "5em"
                }}
                alt={contact.displayName}
                src={contact.photoURL}
              />
              <Typography variant="body1">@{contact.displayName}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <Typography variant="body2">Email:</Typography>
              <Typography variant="body1">{contact.email}</Typography>
              <Button 
                variant="outlined"
                onClick={() => alert("Profile page button clicked")}
              >
                Visit profile page
              </Button>
            </Grid>
          </Grid>
          <Box sx={{marginTop: "2em"}}>
            <Typography variant="body1">Delete contact.</Typography>
            <Typography variant="caption">Note that once deleted this action cannot be undone by any other means than resending a contact request to the user you have removed.</Typography>
            <Button 
              variant="outlined"
              color="error"
              onClick={() => alert("Profile page button clicked")}
            >
              Delete contact
            </Button>
          </Box>
        </Container>
      </Paper>
    </>
  )
}

export default ContactDetails;