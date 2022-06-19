import useAuth from "./useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export default function useProfile() {

  const { isAuthenticated, user } = useAuth();

  const updateProfile = async (field, value) => {
    const profileRef = doc(db, "profile", user.uid);
    try {
      await updateDoc(profileRef, {
        [field]: value
      });
    } catch (error) {
      console.log(error)
    }
  }

  return { updateProfile };
}
