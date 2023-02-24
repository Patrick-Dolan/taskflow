import ContactsList from "./ContactsList";
import { useState } from "react";
import ContactDetails from "./ContactDetails";
import ContactsToolbar from "./ContactsToolbar";
import ContactAddDialog from "../../dialogs/ContactAddDialog";
import { Container } from "@mui/system";
import ContactRequests from "./ContactRequests";
import { UserAuth } from "../../../Contexts/AuthContext";
import { Snackbar, Alert } from "@mui/material";
import { useTheme } from "@emotion/react";
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

  const handleDeleteContact = () => {
    alert("delete clicked");
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
          <ContactsList 
            contacts={user.contacts}
            searchedContact={searchedContact}
            selectContact={handleContactSelection}
          />
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
          backgroundColor: theme.palette.success.light
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ContactsPage;