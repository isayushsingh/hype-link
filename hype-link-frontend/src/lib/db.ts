import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "./firebase"; // Import Firebase app instance

const db = getFirestore(app); // Get Firestore instance

export async function getUserByUsername(username: string) {
  try {
    const userRef = doc(db, "users", username); // Get user document
    const userSnap = await getDoc(userRef); // Fetch data

    if (!userSnap.exists()) return null;

    return userSnap.data(); // Return user data
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}