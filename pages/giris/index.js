import { useState } from "react";
import useErrorMessage from "src/hooks/useErrorMessage";
import styles from "./login.module.css";
import Link from "next/link";
import { Layout } from "src/components";
import Image from "next/image";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export default function Login() {
  const formFields = { email: "", password: "" };

  const [form, setForm] = useState(formFields);

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

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    console.log(user)
    return (
      <div>
        <p>Signed In User: {user.email}</p>
      </div>
    );
  }

  return (
    <Layout>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h2 className={styles.title}>Giriş Yap 👍</h2>
        <a className={`btn ${styles.googlebtn}`}>
          <Image src="/images/google.png" alt="" width={20} height={20} />
          <span className={styles.span}>Google ile giriş</span>
        </a>
        <input type="email" name="email" value={form.email} id="email" onChange={(e) => handleChange(e)} required className={styles.input} placeholder="isim@eposta.com" />
        <input type="password" name="password" value={form.password} id="password" onChange={(e) => handleChange(e)} className={styles.input} placeholder="parola" />
        {firstErrorMessage}
        <button type="submit" aria-label="submit" className="g--btn">
          KAYDET
        </button>
        <Link href="/kayit">
          <a className={styles.message}>
            Kayıtlı değil misiniz? <span className="g--link">Hemen Kaydolun</span>
          </a>
        </Link>
      </form>
    </Layout>
  );
}
