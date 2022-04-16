import { createContext, useEffect, useReducer } from 'react';
import { auth, db } from '../../utils/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import useMessage from '../hooks/useMessage';
import { getDoc, doc, setDoc, onSnapshot } from "firebase/firestore";

const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const reducer = (state, action) => {
  if (action.type === 'AUTH_STATE_CHANGED') {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialAuthState,
  method: 'FirebaseAuth',
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const { showMessage } = useMessage();

  const getOrSetProfile = async (googleUser) => {
    console.log(googleUser);
    const { uid, displayName, email, emailVerified, photoURL } = googleUser;
    let user = { uid, displayName, email, emailVerified, photoURL, createdAt: new Date() }
    const profileRef = await doc(db, 'profile', uid);
    const docSnap = await getDoc(profileRef);
    if (docSnap.exists()) {
      onSnapshot(profileRef, (doc) => {
        user = doc.data();
        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: true,
            user
          }
        });
      });
    } else {
      await setDoc(profileRef, user) // create the document
      getOrSetProfile(user);
    }
  }

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          getOrSetProfile(user);
        } else {
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      }),
    [dispatch]
  );

  const signInWithEmail = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorMessage = error.message;
      showMessage("Giriş bilgileri hatalı", 'error');
    }
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const createUserWithEmail = async (email, password) => {
    try {
      createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {

    }
  }

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'FirebaseAuth',
        createUserWithEmail,
        signInWithEmail,
        signInWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;