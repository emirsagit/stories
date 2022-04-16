import React from "react";
import Image from "next/image";
import styles from "./google-signin.module.css";
import useAuth from "../../src/hooks/useAuth";

export default function GoogleSignin() {

  const { signInWithGoogle } = useAuth();

  const error = false;

  const handleClick = async (e) => {
    e.preventDefault();
    await signInWithGoogle();
  }

  return (
    <button className={`btn ${styles.googlebtn}`} onClick={handleClick}>
      {error && <p className="g-error">Doğrulama Hatası</p>}
      <Image src="/images/google.png" alt="" width={20} height={20} />
      <span className={styles.span}>Google ile giriş</span>
    </button>
  );
}
