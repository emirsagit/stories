import { createContext, useEffect, useState } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../../utils/firebase';
export const CategoryContext = createContext({});
export const CategoryProvider = ({ children }) => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      //firestore get categories
      const categoriesRef = collection(db, "categories");

      // Create a query against the collection.
      const q = query(categoriesRef);

      const querySnapshot = await getDocs(q);
      
      setCategories(querySnapshot);
    };
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};