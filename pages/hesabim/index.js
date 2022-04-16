import React, { useState, useEffect } from "react";
import Layout from "../../src/components/Layout";
import styles from "./hesabim.module.css";
import { getAuth } from "firebase/auth";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

// Create a root reference

export default function index() {
  const storage = getStorage();
  const [user, loading, error] = useAuthState(getAuth());
  const [updateProfile, updating, err] = useUpdateProfile(getAuth());
  const [avatar, setAvatar] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const imgSrc = user ? (user.photoURL ? user.photoURL : "/images/avatar.png") : "/images/avatar.png";
    setAvatar(imgSrc);
    setDisplayName(user ? user.displayName : "");
  }, [user]);

  function handleUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const avatarRef = ref(storage, `/avatar/${user.uid}/${file.name}`);
    uploadBytes(avatarRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      console.log(snapshot);
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        setAvatar(downloadURL);
      });
    });
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.row}>
          <h2>Genel Profil Ayarları</h2>
          <hr />
          <div className={styles.fieldWrapper}>
            <p className={styles.fieldTitle}>Profil Fotoğrafı:</p>
            {avatar && (
              <Image src={avatar} width={250} height={250} className={styles.avatar} />
            )}
            <input type="file" id="myfile" name="myfile" onChange={(e) => handleUpload(e)}></input>
          </div>
          <hr />
          <div className={styles.fieldWrapper}>
            <p className={styles.fieldTitle}>İsim:</p>
            <input type="text" value={displayName} className={styles.input} onChange={(e) => setDisplayName(e.target.value)}></input>
          </div>
          <hr />
          <div className={styles.fieldWrapper}>
            <button
              className="g--btn"
              type="button"
              onClick={async () => {
                await updateProfile({ displayName, photoURL: avatar });
                alert("Updated profile");
              }}
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
