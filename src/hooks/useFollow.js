import { useContext } from 'react';
import { FollowContext } from '../context/FollowContext';

const useFollow = () => useContext(FollowContext);

export default useFollow;