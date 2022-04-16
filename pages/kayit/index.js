import { useState } from "react";
import useErrorMessage from "src/hooks/useErrorMessage";
import styles from "./login.module.css";
import Link from "next/link";
import Layout from ".../../src/components/Layout";
import GoogleSignin from "../giris/google-signin";

export default function Login() {
  const formFields = { email: "", password: "" };

  const [form, setForm] = useState(formFields);

  const [firstErrorMessage, handleErrorMessages] = useErrorMessage(formFields);

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
    // signInWithEmailAndPassword(form.email, form.password);
  }

  return (
    <Layout>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h2 className={styles.title}>Kayıt Ol 👍</h2>
        <GoogleSignin />
        <input type="email" name="email" value={form.email} id="email" onChange={(e) => handleChange(e)} required className={styles.input} placeholder="isim@eposta.com" />
        <input type="password" name="password" value={form.password} id="password" onChange={(e) => handleChange(e)} className={styles.input} placeholder="parola" />
        {firstErrorMessage}
        <button type="submit" aria-label="submit" className="g--btn">
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
