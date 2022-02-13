import React, { useEffect } from "react";
import Image from "next/image";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import styles from "./google-signin.module.css";

export default function GoogleSignin({ getAuth }) {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(getAuth());

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.back();
    }
  }, [user]);

  return (
    <button className={`btn ${styles.googlebtn}`} disabled={loading} onClick={() => signInWithGoogle()}>
      {error && <p className="g-error">Doğrulama Hatası</p>}
      <Image src="/images/google.png" alt="" width={20} height={20} />
      <span className={styles.span}>Google ile giriş</span>
    </button>
  );
}
