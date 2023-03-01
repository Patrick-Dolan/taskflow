import { db } from "../firebase";
import { doc, collection, where, getDocs, setDoc, serverTimestamp, query, deleteDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

// ================= Firebase Auth Functions =================

export const updateUserAuthProfile = async (user, newDisplayName, newPhotoURL) => {
  if (!newDisplayName && !newPhotoURL) {
    console.log("Firebase function updateUserAuthProfile not given both displayName and photoUrl.");
    return
  }

  const info = {
    displayName: newDisplayName || null,
    photoURL: newPhotoURL || null
  }

  await updateProfile(user, info);
}

// =================== Firestore Functions ===================

// ===== User functions =====

// Add or Update takes in user from auth and userDetails object
export const updateUserDBEntry = async (user, userDetails) => {
  // Create Account doc for new user in firestore with user id
  const docRef = doc(db, "users", user.uid );
  const payload = {
    ...userDetails,
    createdAt: user.createdAt || serverTimestamp()
  }
  await setDoc(docRef, payload, { merge: true });
}

// Delete user firestore entry
// TODO When tasks, project, etc... are added to user delete subcollections then user otherwise subcollections arent deleted by firebase.
export const deleteUserFirestoreEntry = async (userId) => {
  await deleteDoc(doc(db, "users", userId));
}

// Retrieve usernames to check for availability

export const usernameAvailable = async (newDisplayName) => {
  const users = collection(db, "users");

  // displayNameControl is a lowercase version of the display name for checking so people dont use the same name with different capitalization
  const q = query(users, where("displayNameControl", "==", `${newDisplayName.toLowerCase()}`));

  const querySnapshot = await getDocs(q);
  let username = "";
  querySnapshot.forEach((doc) => {
    const user = doc.data();
    username = user.displayNameControl;
  });

  return (username !== newDisplayName.toLowerCase()) ? true : false;
}

// Retrieve user by handles
export const getUserDetailsByUsername = async (searchedDisplayName) => {
  const q = query(collection(db, "users"), where("displayNameControl", "==", searchedDisplayName.toLowerCase()));

  const querySnapshot = await getDocs(q);
  let user = {};
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    user = {...doc.data()};
  });
  return user;
}

export const getUserDetailsByEmail = async (searchedEmail) => {
  const q = query(collection(db, "users"), where("emailControl", "==", searchedEmail.toLowerCase()));

  const querySnapshot = await getDocs(q);
  let user = {};
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    user = {...doc.data()};
  });
  return user;
}

// TODO See if this code can be used when deleting a user account to remove contact from other users.
// export const deleteContactFromUsers = async (contactToDelete) => {
//   const q = query(collection(db, "users"), where("contacts", "array-contains", contactToDelete));

//   const querySnapshot = await getDocs(q);
//   console.log(querySnapshot)
//   querySnapshot.forEach((doc) => {
//     console.log(doc)
//     // // doc.data() is never undefined for query doc snapshots
//     // console.log(doc.id, " => ", doc.data());
//     const userWithContact = doc.data();
//     console.log(userWithContact);
//     const newContacts = userWithContact.contacts.filter(e => e.email !== contactToDelete.email);
//     const userDetails = {
//       contacts: newContacts
//     }
//     updateUserDBEntry(userWithContact, userDetails);
//   });
// }
