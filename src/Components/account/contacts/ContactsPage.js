import ContactsList from "./ContactsList";
import { useState } from "react";
import ContactDetails from "./ContactDetails";
import ContactsToolbar from "./ContactsToolbar";
import ContactAddDialog from "../../dialogs/ContactAddDialog";
import { Container } from "@mui/system";
import ContactRequests from "./ContactRequests";
import { UserAuth } from "../../../Contexts/AuthContext";
import { Snackbar, Alert, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { getUserDetailsByEmail, updateUserDBEntry } from "../../../FirebaseFunctions";
// For contacts placeholder testing
// import { v4 as uuid } from "uuid";

const ContactsPage = () => {
  const { user, setUser } = UserAuth();
  const theme = useTheme();

  // ------------------- FOR TESTING -------------------
  // Contacts placeholder, going to keep for now because I may need to use it in the future for testing.
  // const contactsPlaceholder = [
  //   {
  //     displayName: "BarkNessMonster",
  //     uid: uuid(),
  //     email: "barknessmonster@example.com",
  //     photoURL: "https://dummyimage.com/300x300/000075/fff?text=B"
  //   },
  //   {
  //     displayName: "PoodlePuzzle",
  //     uid: uuid(),
  //     email: "poodlepuzzle@example.com",
  //     photoURL: "https://dummyimage.com/300x300/bfef45/fff?text=P"
  //   },
  //   {
  //     displayName: "LabradorLaugh",
  //     uid: uuid(),
  //     email: "labradorlaugh@example.com",
  //     photoURL: "https://dummyimage.com/300x300/ffe119/fff?text=L"
  //   },
  //   {
  //     displayName: "GoldenGiggle",
  //     uid: uuid(),
  //     email: "goldengiggle@example.com",
  //     photoURL: "https://dummyimage.com/300x300/f58231/fff?text=G"
  //   },
  //   {
  //     displayName: "HoundHilarity",
  //     uid: uuid(),
  //     email: "houndhilarity@example.com",
  //     photoURL: "https://dummyimage.com/300x300/469990/fff?text=H"
  //   },
  //   {
  //     displayName: "ChihuahuaComedy",
  //     uid: uuid(),
  //     email: "chihuahuacomedy@example.com",
  //     photoURL: "https://dummyimage.com/300x300/f032e6/fff?text=C"
  //   }
  // ];
  // ------------------- FOR TESTING -------------------

  const [showContactDetails, setShowContactDetails] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchedContact, setSearchedContact] = useState("");
  const [openAddContactDialog, setOpenAddContactDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState("success")

  const handleContactSelection = (contact) => {
    setSelectedContact(contact);
    setShowContactDetails(true);
  }

  const handleGoBackToContactsList = () => {
    setSelectedContact(null);
    setShowContactDetails(false);
  }

  const handleOpenAddContactDialog = () => {
    setOpenAddContactDialog(true);
  }

  const handleDeleteContact = async (contactToDelete) => {
    try {
      // Build new user details objects
      const updatedContacts = user.contacts.filter(e => e.email !== contactToDelete.email);
      const userDetails = {
        contacts: updatedContacts
      }

      // Update current user
      await updateUserDBEntry(user, userDetails);

      // Build deleted user new details object
      const deletedContactUser = await getUserDetailsByEmail(contactToDelete.email);
      const deletedContactUserUpdatedContacts = deletedContactUser.contacts.filter(e => e.email !== user.email);
      const deletedContactUserDetails = {
        contacts: deletedContactUserUpdatedContacts
      }

      // Update deleted users contacts
      await updateUserDBEntry(deletedContactUser, deletedContactUserDetails);

      handleGoBackToContactsList();

      // Update local state to reflect database changes
      setUser({
        ...user,
        contacts: updatedContacts
      })

      // Notify user of success or failure of deletion
      setSnackbarAlertSeverity("success")
      setSnackbarMessage("Contact deleted.")
      setSnackbarOpen(true);
    } catch (e) {
      setSnackbarAlertSeverity("error")
      setSnackbarMessage(`Contact deletion error: ${e.message}`)
      setSnackbarOpen(true);
    }
  }

  return (
    <Container maxWidth="md">
      <ContactsToolbar 
        contacts={user.contacts}
        searchedContact={searchedContact}
        setSearchedContact={setSearchedContact}
        openAddContactDialog={handleOpenAddContactDialog}
      />
      {(showContactDetails) ? (
        <ContactDetails 
          contact={selectedContact}
          goBackToContactsList={handleGoBackToContactsList}
          deleteContact={handleDeleteContact}
        />
      ) : (
        <>
          {(user.contactRequests.length > 0) 
            ? (
              <ContactRequests 
                user={user}
                setUser={setUser}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarAlertSeverity={setSnackbarAlertSeverity}
              />
            )
            : (null)
          }
          {(user.contacts.length > 0)
            ? (
              <ContactsList 
                contacts={user.contacts}
                searchedContact={searchedContact}
                selectContact={handleContactSelection}
              />
            )
            : (
              <Typography variant="body2">No contacts to show.</Typography>
            )}
        </>
      )}
      <ContactAddDialog 
        open={openAddContactDialog}
        setOpen={setOpenAddContactDialog}
        onClose={() => setOpenAddContactDialog(false)}
      />
      <Snackbar
        open={snackbarOpen} 
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert 
          severity={snackbarAlertSeverity} 
          sx={{
          backgroundColor: (snackbarAlertSeverity === "success") ? theme.palette.success.light : theme.palette.error.light
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ContactsPage;