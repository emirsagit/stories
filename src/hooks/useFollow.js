import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../utils/firebase";


export default function useFollow(contentUser) {

  const { isAuthenticated, user } = useAuth();
  const authId = user?.uid;
  const contentUserId = contentUser?.uid;
  const followRef = user ? doc(db, "follow", authId) : "";
  const followerRef = contentUser ? doc(db, "follow", contentUserId) : "";
  const [contentUserFollows, setContentUserFollows] = useState([]);
  const [authUserFollows, setAuthUserFollows] = useState([]);

  const isContentUserFollowed = isAuthenticated ? contentUserFollows?.followers?.some(follower => {
    return follower.uid === authId;
  }) : false;

  const getFollows = async () => {
    try {
      if (isAuthenticated) {
        const followSnap = await getDoc(followRef);
        setAuthUserFollows(followSnap.data());
      }
      if (contentUserId) {
        const followerSnap = await getDoc(followerRef);
        setContentUserFollows(followerSnap.data());
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollows();
  }, []);


  const saveToFollow = async () => {
    if (!isAuthenticated || user.uid === contentUser.uid) return;
    try {
      await updateDoc(followRef, {
        follows: arrayUnion({
          uid: contentUserId,
          name: contentUser.name,
          photoURL: contentUser.photoURL,
          createdAt: new Date()
        })
      });
      await updateDoc(followerRef, {
        followers: arrayUnion({
          uid: authId,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date()
        })
      });
      getFollows();
    } catch (error) {
      console.log(error);
    }
  }

  const removeFollow = async () => {
    if (!isAuthenticated || user.uid === contentUser.uid) return;

    try {
      await updateDoc(followRef, {
        follows: arrayRemove(authUserFollows.follows.find(follow => follow.uid === contentUserId))
      });
      await updateDoc(followerRef, {
        followers: arrayRemove(contentUserFollows.followers.find(follower => follower.uid === authId))
      });
      getFollows();
    } catch (error) {
      console.log(error);
    }
  }

  return { authUserFollows, contentUserFollows, isContentUserFollowed, saveToFollow, removeFollow };
}
