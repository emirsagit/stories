import React, { useState } from "react";
import styles from "./profile.module.css";
import Link from "next/link";
import Router from "next/router";
import BgOverlay from "../../../BgOverlay";
import useAuth from "../../../../../hooks/useAuth";
import Image from "next/image";

export default function ProfileLink({ user }) {
  const [showLinks, setShowLinks] = useState(false);
  const { photoURL, email } = user;
  const { logout } = useAuth();

  const signOutHandler = (e) => {
    e.preventDefault();
    logout();
    Router.push("/");
  }

  const displayLinks = () => {
    setShowLinks(!showLinks)
  }

  let links = showLinks ? (
    <ul className={`${styles.profileLinks} g--z-3`}>
      <Link href="/">
        <a className={styles.link}>
          <li className={styles.item}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={styles.span}>Profil</span>
          </li>
        </a>
      </Link>
      <Link href="/hesabim">
        <a className={styles.link}>
          <li className={styles.item}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
            <span className={styles.span}>Hesap Ayarları</span>
          </li>
        </a>
      </Link>
      <Link href="/">
        <a className={styles.link} onClick={signOutHandler}>
          <li className={styles.item}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
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
      <button className={`${styles.accountBtn} g--z-3 g--relative`} onClick={() => displayLinks()}>
        {photoURL ? <Image src={photoURL} key={photoURL} width={25} height={25} className={styles.avatar} /> : <span className={styles.profilePhoto}>{email.charAt(0)}</span>}
        <span>Hesabım</span>
      </button>
      <BgOverlay active={showLinks} onClick={() => setShowLinks(false)} />
      {links}
    </div>
  );
}
