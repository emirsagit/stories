import Link from "next/link";
import { Logo } from "src/components";
import NavLinks from "./local/NavLinks";
import ProfileLink from "./local/Profile-link";
import styles from "./nav.module.css";
import { getAuth } from "firebase/auth";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";

export default function Nav() {
  const [sendEmailVerification, sending, err] = useSendEmailVerification(getAuth());
  const [user, loading, error] = useAuthState(getAuth());
  let emailVerification = true;
  if (user?.emailVerified == false) {
    emailVerification = false;
  }

  async function sendEmail() {
    console.log("here");
    await sendEmailVerification();
    alert("Doğrulama Maili Gönderildi.");
  }

  return (
    <>
      {!emailVerification && (
        <p className={styles.verify}>
          Lütfen email adresinizi onaylayın.{" "}
          <span className="g--link" onClick={() => sendEmail()}>
            Onay Emaili Gönder
          </span>
        </p>
      )}
      <header>
        <nav className={`${styles.flex} g--mt`}>
          <Logo />
          <NavLinks styles={styles} />
          {user ? (
            <ProfileLink user={user} />
          ) : (
            <Link href="/giris">
              <a className="g--btn">Giriş / Kayıt</a>
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
