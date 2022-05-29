import { useState, useEffect } from "react";
import styles from "../giris/login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import RedirectAfterAuth from "../../src/components/Helpers/RedirectAfterAuth";
import useAuth from "../../src/hooks/useAuth";

export default function ForgotPassword() {
  const formFields = { email: "" };
  const [form, setForm] = useState(formFields);
  const [error, setError] = useState(false);
  const { isAuthenticated, sendPassResetMail } = useAuth();

  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (e) => {
    if (!form.email) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    e.preventDefault();
    await sendPassResetMail(form.email);
  }

  return (
    <Layout>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h2 className={styles.title}>Şifremi Sıfırla</h2>
        <input type="email" name="email" value={form.email} id="email" onChange={(e) => handleChange(e)} required className={styles.input} placeholder="isim@eposta.com" />
        <button type="submit" aria-label="submit" className="g--btn g--fs-md">
          Sıfırlama Linki Gönder
        </button>
        {error && <p className="g-error">Lütfen mail adresinizi tekrar kontrol edin.</p>}
        <Link href="/giris">
          <a className={styles.message}>
            <span className="g--link">Giriş Yap</span>
          </a>
        </Link>
      </form>
      <RedirectAfterAuth user={user} />
    </Layout>
  );
}
