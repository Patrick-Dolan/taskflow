import { Divider, Typography } from "@mui/material"
import ContactsList from "./ContactsList";
import { v4 as uuid } from "uuid";

const Contacts = () => {
  const contacts = [
    {
      displayName: "BarkNessMonster",
      uid: uuid(),
      email: "barknessmonster@example.com",
      photoURL: "https://dummyimage.com/300x300/000075/fff?text=B"
    },
    {
      displayName: "PoodlePuzzle",
      uid: uuid(),
      email: "poodlepuzzle@example.com",
      photoURL: "https://dummyimage.com/300x300/bfef45/fff?text=P"
    },
    {
      displayName: "LabradorLaugh",
      uid: uuid(),
      email: "labradorlaugh@example.com",
      photoURL: "https://dummyimage.com/300x300/ffe119/fff?text=L"
    },
    {
      displayName: "GoldenGiggle",
      uid: uuid(),
      email: "goldengiggle@example.com",
      photoURL: "https://dummyimage.com/300x300/f58231/fff?text=G"
    },
    {
      displayName: "HoundHilarity",
      uid: uuid(),
      email: "houndhilarity@example.com",
      photoURL: "https://dummyimage.com/300x300/469990/fff?text=H"
    },
    {
      displayName: "ChihuahuaComedy",
      uid: uuid(),
      email: "chihuahuacomedy@example.com",
      photoURL: "https://dummyimage.com/300x300/f032e6/fff?text=C"
    }
  ];

  return (
    <>
      <Typography variant="h4">Contacts</Typography>
      <Divider />
      <ContactsList 
        contacts={contacts}
      />
    </>
  )
}

export default Contacts;