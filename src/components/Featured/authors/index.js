import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Button from '../../Button'
import styles from "./authors.module.css";
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';
import Follow from '../../Button/Follow';

export default function Authors() {

  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const getAuthors = async () => {
      const authorsRef = collection(db, 'profile');
      const q = query(authorsRef, orderBy('score', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      let data = querySnapshot.docs.map((doc) => doc.data());
      setAuthors(data);
    }
    if (authors.length === 0) {
      getAuthors();
    }
  }, []);

  return (
    <div className={styles.authors}>
      <div className={styles.meta}>
        <h2>İlk 10</h2>
        <Link href="/">
          <a className={styles.link}>Tamamı</a>
        </Link>
      </div>
      <ul className={styles.list}>
        {authors.map((author, index) => (
          <li className={styles.author} key={index}>
            <p>
              {`#${index + 1}. ${author.displayName}`} <br />
              <span className={styles.span}>{author.score} Puan</span>
            </p>
            <Follow contentUser={author}/>
          </li>
        ))}
      </ul>
    </div>
  )
}
