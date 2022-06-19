import { createContext, useEffect, useState } from 'react';
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../../utils/firebase';
import useAuth from '../hooks/useAuth';
export const FollowContext = createContext({});

export const FollowProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const authId = user?.uid;
  const followRef = user ? doc(db, "follow", authId) : "";
  const [authUserFollows, setAuthUserFollows] = useState([]);

  const isContentUserFollowed = (contentUserId) => {
    return isAuthenticated ? authUserFollows?.follows?.some(follow => {
      return follow.uid === contentUserId;
    }) : false;
  }

  const getFollows = async () => {
    try {
      if (isAuthenticated) {
        const followSnap = await getDoc(followRef);
        setAuthUserFollows(followSnap.data());
      } else {
        setAuthUserFollows([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollows();
  }, [isAuthenticated]);

  const handleFollow = async (contentUser) => {
    if (!isAuthenticated || user.uid === contentUser.uid) return;
    isContentUserFollowed(contentUser.uid) ? await removeFollow(contentUser) : await saveToFollow(contentUser);
  }

  const saveToFollow = async (contentUser) => {
    const contentUserId = contentUser.uid;
    const followerRef = doc(db, "follow", contentUserId);
    try {
      await updateDoc(followRef, {
        follows: arrayUnion({
          uid: contentUserId,
          displayName: contentUser.displayName,
          photoURL: contentUser.photoURL,
          createdAt: new Date()
        })
      });
      await updateDoc(followerRef, {
        followers: arrayUnion({
          uid: authId,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date()
        })
      });
      getFollows();
    } catch (error) {
      console.log(error);
    }
  }

  const removeFollow = async (contentUser) => {
    const contentUserId = contentUser.uid;
    const followerRef = doc(db, "follow", contentUserId);
    const followerSnap = await getDoc(followerRef);
    const contentUserFollows = followerSnap.data();
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
  return (
    <FollowContext.Provider
      value={{ authUserFollows, isContentUserFollowed, handleFollow }}
    >
      {children}
    </FollowContext.Provider>
  );
};