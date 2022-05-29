import { useState, useEffect } from "react";
import useErrorMessage from "../../src/hooks/useErrorMessage";
import styles from "./login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import GoogleSignin from "./google-signin";
import Layout from "../../src/components/Layout";
import RedirectAfterAuth from "../../src/components/Helpers/RedirectAfterAuth";
import useAuth from "../../src/hooks/useAuth";

export default function Login() {
  const formFields = { email: "", password: "" };
  const [form, setForm] = useState(formFields);
  const [error, setError] = useState(false);
  const { user, isAuthenticated, signInWithEmail } = useAuth();

  const [firstErrorMessage, handleErrorMessages] = useErrorMessage(formFields);

  const router = useRouter();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push('/');
  //   }
  // }, [isAuthenticated]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });

    handleErrorMessages(name);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmail(form.email, form.password);
  }

  return (
    <Layout>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h2 className={styles.title}>Giriş Yap 👍</h2>
        <GoogleSignin />
        <input type="email" name="email" value={form.email} id="email" onChange={(e) => handleChange(e)} required className={styles.input} placeholder="isim@eposta.com" />
        <input type="password" name="password" value={form.password} id="password" onChange={(e) => handleChange(e)} className={styles.input} placeholder="parola" />
        {firstErrorMessage}
        <Link href="/sifremi-unuttum">
          <a className={styles.forgotPassword}>
            <span className="g--link">Şifremi Unuttum</span>
          </a>
        </Link>
        <button type="submit" aria-label="submit" className="g--btn g--fs-lg">
          GİRİŞ
        </button>
        {error && <p className="g-error">Şifre ya da kullanıcı adı hatalı</p>}
        <Link href="/kayit">
          <a className={styles.message}>
            Kayıtlı değil misiniz? <span className="g--link">Hemen Kaydolun</span>
          </a>
        </Link>
      </form>
      <RedirectAfterAuth user={user} />
    </Layout>
  );
}
