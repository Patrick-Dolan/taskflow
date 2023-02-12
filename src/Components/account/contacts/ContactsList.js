import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

const ContactsList = (props) => {
  const { contacts, selectContact, searchedContact } = props;

  return(
    <> 
      <List>
      {(searchedContact
          ? contacts?.sort((a, b) => a.displayName === searchedContact ? -1 : b.displayName === searchedContact ? 1 : 0)
          : contacts?.sort((a, b) => a.displayName.localeCompare(b.displayName))
        ).map((contact) => (
          <ListItemButton
            key={contact.uid}
            onClick={() => selectContact(contact)}
          >
            <ListItemAvatar>
              <Avatar alt={contact.displayName} src={contact.photoURL} />
            </ListItemAvatar>
            <ListItemText 
              primary={contact.displayName}
              secondary={contact.email}
            />
          </ListItemButton>
      ))}
      </List>
    </>
  )
}

export default ContactsList;