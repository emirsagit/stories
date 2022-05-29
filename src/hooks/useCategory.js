import { useContext } from 'react';
import { CategoryContext } from '../context/CategoryContext';

const useCategory = () => useContext(CategoryContext);

export default useCategory;