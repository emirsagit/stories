import Link from "next/link";
import NavLinks from "./local/NavLinks";
import ProfileLink from "./local/Profile-link";
import styles from "./nav.module.css";
import Button from "../../Button";
import Logo from "../../Logo";
import useAuth from "../../../hooks/useAuth";

export default function Nav() {
  // const [sendEmailVerification, sending, err] = useSendEmailVerification(getAuth());
  const { user, isAuthenticated, sendVerifyEmailMessage } = useAuth();

  const emailVerification = user?.emailVerified;

  async function sendEmail() {
    console.log("here");
    await sendVerifyEmailMessage();
  }

  return (
    <>
      {isAuthenticated && !emailVerification && (
        <p className={styles.verify}>
          Lütfen email adresinizi doğrulayın.{" "}
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
              <a>
                <Button size={18}>GİRİŞ</Button>
              </a>
              {/* <a className="g--btn"></a> */}
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
