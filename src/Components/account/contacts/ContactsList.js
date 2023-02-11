import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

const ContactsList = (props) => {
  const { contacts } = props;

  return(
    <> 
      <List>
      {contacts.map((contact) => (
        <ListItemButton
          key={contact.uid}
          onClick={() => alert(contact.displayName)}
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