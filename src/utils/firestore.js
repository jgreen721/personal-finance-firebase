import {
  addDoc,
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { createZuluTimestamp } from "./helpers";

export const addItemToFirestore = async (collectionName, payload) => {
  let successIcons = ["🔥", "🥳", "😎"];
  let successIcon = successIcons[(Math.random() * successIcons.length) | 0];
  try {
    await addDoc(collection(db, collectionName), payload);
    console.log(`${collectionName} successfully added!`);
    return {
      status: 200,
      msg: `${collectionName} has been successfully added! ${successIcon}`,
    };
  } catch (e) {
    console.log(`Error adding ${collectionName}`, e.message);
    return {
      status: 500,
      msg: `Error -- could not add ${collectionName}.`,
    };
  }
};

export const fetchItemsFromFirestore = (
  collectionName,
  userEmail,
  setState
) => {
  try {
    let unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
      let tempUsersData = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((doc) => doc.person_for_email == userEmail);
      setState(tempUsersData);
    });
    return unsubscribe;
  } catch (e) {
    console.log("Error in fetchItemsFromFirestore", e.message);
  }
};

export const editItemFromFirestore = async (collectionName, id, updatedObj) => {
  // console.log("editItemFromFirestore.");
  return new Promise(async (resolve) => {
    try {
      const itemRef = doc(db, collectionName, id);

      let updatedDoc = await updateDoc(itemRef, updatedObj);
      // console.log("updatedDoc", itemRef);
      resolve({ status: 200, msg: "Document updated successfully!" });
    } catch (e) {
      console.log("Error", e);
    }
  });
};

export const deleteItemFromFirestore = async (collectionName, item) => {
  try {
    if (!item?.id) throw new Error("Invalid item ID");

    const itemRef = doc(db, collectionName, item.id);
    await deleteDoc(itemRef);

    console.log("Item successfully deleted...");
  } catch (e) {
    console.error("Error deleting item:", e.message);
  }
};
