import { useEffect, useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";

import GoogleSignin from "../giris/google-signin";
import Layout from "../../src/components/Layout";
import useErrorMessage from "../../src/hooks/useErrorMessage";
import useAuth from "../../src/hooks/useAuth";
import useProfile from "../../src/hooks/useProfile";
import { useRouter } from "next/router";

export default function Login() {
  const formFields = { email: "", password: "", fullName: "" };
  const [error, setError] = useState(false);
  const [form, setForm] = useState(formFields);
  const { createUserWithEmail } = useAuth();
  const [firstErrorMessage, handleErrorMessages] = useErrorMessage(formFields);
  const { isAuthenticated, user } = useAuth();
  const { updateProfile } = useProfile();
  const router = useRouter();

  useEffect(() => {
    const updateFullName = async () => {
      if (form.fullName) {
        await updateProfile("displayName", form.fullName);
      }
    }
    if (isAuthenticated) {
      updateFullName();
      router.push('/');
    }
  }, [user])


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
    await createUserWithEmail(form.email, form.password, form.fullName);
  }

  return (
    <Layout>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h2 className={styles.title}>Kayıt Ol 👍</h2>
        <GoogleSignin btnName="Google İle Kayıt Ol" />
        <input type="text" name="fullName" value={form.fullName} id="fullName" onChange={(e) => handleChange(e)} required className={styles.input} placeholder="Adınız" />
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
