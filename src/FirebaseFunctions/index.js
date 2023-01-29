import { db } from "../firebase";
import { doc, collection, where, getDocs, setDoc, serverTimestamp, query } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

// ================= Firebase Auth Functions =================

export const updateUserAuthProfile = async (user, newDisplayName, newPhotoURL) => {
  if (!newDisplayName && !newPhotoURL) {
    console.log("Firebase function updateUserAuthProfile not given acceptable new profile information object.");
  }
  const info = {
    displayName: newDisplayName || null,
    photoURL: newPhotoURL || null
  }
  updateProfile(user, info)
    .then(() => {
      console.log("Authentication profile updated successfully.");
    })
    .catch((e) => {
      console.log("Auth profile update error: ", e.message);
    });
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