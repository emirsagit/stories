import { useState } from "react";
import useErrorMessage from "src/hooks/useErrorMessage";
import styles from "./login.module.css";
import Link from "next/link";
import { Layout } from "src/components";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import firebase from "../../utils/firebase/firebaseClient";
import { getAuth } from "firebase/auth";
import GoogleSignin from "pages/giris/google-signin";

export default function Login() {
  const formFields = { email: "", password: "" };

  const [form, setForm] = useState(formFields);

  const [firstErrorMessage, handleErrorMessages] = useErrorMessage(formFields);

  const [signInWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(getAuth());

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

  if (user) {
    return (
      <div>
        <p>Signed In User: {user}</p>
      </div>
    );
  }

  return (
    <Layout>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h2 className={styles.title}>Kayıt Ol 👍</h2>
        <GoogleSignin getAuth={getAuth} />
        <input type="email" name="email" value={form.email} id="email" onChange={(e) => handleChange(e)} required className={styles.input} placeholder="isim@eposta.com" />
        <input type="password" name="password" value={form.password} id="password" onChange={(e) => handleChange(e)} className={styles.input} placeholder="parola" />
        {firstErrorMessage}
        <button type="submit" aria-label="submit" className="g--btn" disabled={loading}>
          KAYDET
        </button>
        {error && <p className="g-error">Şifre ya da kullanıcı adı hatalı</p>}
        <Link href="/giris">
          <a className={styles.message}>
            Daha önce üye oldunuz mu? <span className="g--link">Giriş Yapın</span>
          </a>
        </Link>
      </form>
    </Layout>
  );
}
