import { createContext, useEffect, useReducer } from 'react';
import { auth, db } from '../../utils/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import useMessage from '../hooks/useMessage';
import { doc, updateDoc, setDoc, onSnapshot, where, collection, query, limit } from "firebase/firestore";

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

const firebaseErrors = {
  'auth/user-not-found': 'Kullanıcı Bulunamadı',
  'auth/invalid-email': 'Geçersiz mail adresi',
  'auth/wrong-password': 'Giriş bilgileri hatalı',
  'auth/weak-password': 'Şifre en az 6 karakter olmalıdır',
  'auth/too-many-requests': 'Çok fazla istek gönderildi, bir süre sonra tekrar deneyin',
  'auth/email-already-in-use': 'Email adresi ile daha önce kayıt olunmuş',
}; // list of firebase error codes to alternate error messages

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

  const getOrSetProfile = async (googleUser, fullName = null) => {
    const { uid, email, emailVerified, photoURL } = googleUser;
    const displayName = fullName || googleUser.displayName;
    let user = { uid, displayName, email, emailVerified, photoURL, createdAt: new Date(), notificationStatus: true, isDisabled: false, score: 0, phoneNumber: null, instagram: null, facebook: null, twitter: null, linkedin: null, website: null, bio: null };
    const profileRef = collection(db, 'profile');
    const q = await query(profileRef, where("email", "==", email), limit(1));
    onSnapshot(q, async (querySnapshot) => {
      if (querySnapshot.size !== 0) {
        querySnapshot.forEach((doc) => {
          user = doc.data();
          if (user.emailVerified !== googleUser.emailVerified) {
            _updateEmailVerifiedCol(googleUser);
          }
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        });
      } else {
        await setDoc(doc(db, "profile", user.uid), user) // create the document
        getOrSetProfile(user);
      }
    })
  }

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
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
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      showMessage(firebaseErrors[error.code] || error.message, 'error');
    }
  }

  const sendVerifyEmailMessage = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      showMessage("Doğrulama postası gönderildi. Lütfen mail adresinize girerek doğrulama yapın.", 'success');
    } catch (error) {
      showMessage(firebaseErrors[error.code] || error.message, 'error');
    }
  }

  const sendPassResetMail = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      showMessage("Şifre sıfırlama linki e-posta adresinize gönderildi", 'success');
    } catch (error) {
      showMessage(firebaseErrors[error.code] || error.message, 'error');
    }
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
      }).catch((error) => {
        showMessage(firebaseErrors[error.code] || error.message, 'error');
      });
  };

  const createUserWithEmail = async (email, password, fullName) => {
    try {
      let result = await createUserWithEmailAndPassword(auth, email, password);
      await sendVerifyEmailMessage();
      getOrSetProfile(result.user, fullName);
    } catch (error) {
      showMessage(firebaseErrors[error.code] || error.message, 'error');
    }
  }

  const logout = () => {
    return signOut(auth);
  };

  const _updateEmailVerifiedCol = async (user) => {
    updateDoc(doc(db, "profile", user.uid), {
      emailVerified: user.emailVerified,
    });
  }

  const updateProfileField = async (user, fieldName, value) => {
    updateDoc(doc(db, "profile", user.uid), {
      [fieldName]: value,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'FirebaseAuth',
        createUserWithEmail,
        signInWithEmail,
        signInWithGoogle,
        sendVerifyEmailMessage,
        sendPassResetMail,
        updateProfileField,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;