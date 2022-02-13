import React, { useState } from "react";
import styles from "./profile.module.css";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import Router from "next/router";

export default function ProfileLink({ user }) {
  console.log(user);
  const [showLinks, setShowLinks] = useState(false);
  const { photoURL, email } = user;

  const logout = async (e) => {
    e.preventDefault();
    await signOut(getAuth());
    Router.push("/");
  };

  let links = showLinks ? (
    <ul className={`${styles.profileLinks}`}>
      <Link href="/">
        <a className={styles.link}>
          <li className={styles.item}>
            <span className={styles.span}>Profil</span>
          </li>
        </a>
      </Link>
      <Link href="/hesabim">
        <a className={styles.link}>
          <li className={styles.item}>
            <span className={styles.span}>Hesap Ayarları</span>
          </li>
        </a>
      </Link>
      <Link href="/">
        <a className={styles.link} onClick={(e) => logout(e)}>
          <li className={styles.item}>
            <span className={styles.span}>Çıkış</span>
          </li>
        </a>
      </Link>
    </ul>
  ) : (
    ""
  );

  return (
    <div className={styles.container}>
      <button className={styles.accountBtn} onClick={() => setShowLinks(!showLinks)}>
        {photoURL ? <img src={photoURL} className={styles.avatar}></img> : <span className={styles.profilePhoto}>{email.charAt(0)}</span>}
        <span>Hesabım</span>
      </button>
      {links}
    </div>
  );
}
