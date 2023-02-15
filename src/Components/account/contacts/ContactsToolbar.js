import { useTheme } from "@emotion/react";
import { Grid, Typography, Button, Tooltip, Divider, Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const ContactsToolbar = (props) => {
  const { contacts, searchedContact, setSearchedContact, openAddContactDialog } = props;
  const theme = useTheme();
  const [showSearch, setShowSearch] = useState(false);

  const filteredContacts = contacts.map((e) => e.displayName)

  // TODO set up css and classname
  const buttonStyles = {
    maxHeight: "2.5em",
    minHeight: "2.5em",
    maxWidth: "2.5em",
    minWidth: "2.5em",
  }

  return (
    <>
      <Grid 
        container 
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4">Contacts</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing="4">
            <Grid item>
              <Tooltip title="Add Contact" enterDelay={500} leaveDelay={200}>
                <Button sx={buttonStyles} variant="contained" size="small" onClick={openAddContactDialog}><AddIcon /></Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Search Contacts" enterDelay={500} leaveDelay={200}>
                <Button 
                  sx={{
                    ...buttonStyles, 
                    backgroundColor: (showSearch) ? theme.palette.primary.light : theme.palette.primary.main
                  }} 
                  variant="contained" 
                  size="small" 
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <SearchIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider 
        sx={{
          marginBottom: ".65em"
        }}
      />
      {(showSearch) ? 
        <Autocomplete
          sx={{
            marginBottom: ".65em"
          }}
          options={filteredContacts}
          getOptionLabel={(option) => option}
          size="small"
          inputValue={searchedContact}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{minWidth: { sm: "15em", md: "30em" }}}
              label="Search contacts"
              variant="outlined"
            />
          )}
          onInputChange={(event, value) => setSearchedContact(value)}
        />
        : null
      }
    </>
  )
}

export default ContactsToolbar;