import { useState, useEffect } from "react";
import useErrorMessage from "src/hooks/useErrorMessage";
import styles from "./login.module.css";
import Link from "next/link";
import { Layout } from "src/components";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import GoogleSignin from "./google-signin";
import { RedirectAfterAuth } from "src/components";

export default function Login() {
  const formFields = { email: "", password: "" };

  const [form, setForm] = useState(formFields);

  const router = useRouter();

  const [firstErrorMessage, handleErrorMessages] = useErrorMessage(formFields);

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(getAuth());

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

  function handleSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(form.email, form.password);
  }

  return (
    <Layout>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h2 className={styles.title}>Giriş Yap 👍</h2>
        <GoogleSignin getAuth={getAuth} />
        <input type="email" name="email" value={form.email} id="email" onChange={(e) => handleChange(e)} required className={styles.input} placeholder="isim@eposta.com" />
        <input type="password" name="password" value={form.password} id="password" onChange={(e) => handleChange(e)} className={styles.input} placeholder="parola" />
        {firstErrorMessage}
        <button type="submit" aria-label="submit" className="g--btn" disabled={loading}>
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
