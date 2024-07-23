import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Function to search for students
export const searchStudents = async (name, team, instrument, age) => {
  try {
    let q = collection(db, "students");

    const birthYear = new Date().getFullYear() - Number(age);

    const conditions = [];

    if (name) {
      conditions.push(where("firstName", ">=", name));
      conditions.push(where("firstName", "<=", name + "\uf8ff"));
    }
    if (team) {
      conditions.push(where("team", "==", team));
    }
    if (instrument) {
      conditions.push(where("instrument", "==", instrument));
    }
    if (birthYear) {
      conditions.push(where("birthYear", "==", birthYear.toString()));
    }

    if (conditions.length > 0) {
      q = query(q, ...conditions, orderBy("firstName"));
    }

    const querySnapshot = await getDocs(q);
    const students = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return students;
  } catch (error) {
    console.error("Error searching students:", error);
  }
};
