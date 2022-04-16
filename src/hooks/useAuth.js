import { useContext } from 'react';
import AuthContext from '../context/FirebaseAuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;