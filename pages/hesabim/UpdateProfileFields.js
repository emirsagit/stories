import React, { useState } from 'react'
import useMessage from '../../src/hooks/useMessage';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../utils/firebase';

export default function UpdateProfileFields({ styles, user }) {
  const turkishFields = {
    displayName: 'Adınız',
    phoneNumber: 'Telefon Numarası',
    email: 'E-posta',
    instagram: 'Instagram',
    facebook: 'Facebook',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    website: 'Website',
    bio: 'Hakkımda',
  }
  let fields = { displayName: "", phoneNumber: "", instagram: "", facebook: "", twitter: "", linkedin: "", website: "", bio: "" };
  const [form, setForm] = useState({ ...fields, ...user });
  const { showMessage } = useMessage();

  const updateProfile = async (e) => {
    e.preventDefault();
    const { displayName, phoneNumber, instagram, facebook, twitter, linkedin, website, bio } = form;
    if (!displayName || displayName.length < 2) {
      showMessage("Adınız en az üç karakter olmalıdır", 'error');
      return;
    }
    try {
      updateDoc(doc(db, "profile", user.uid), {
        displayName, phoneNumber, instagram, facebook, twitter, linkedin, website, bio
      });
    } catch (error) {
      showMessage(error.message, 'error');
    }
  }

  return (
    <form className={styles.fieldWrapper}>
      {Object.keys(fields).map(function (key, index) {
        const fieldVal = form[key];
        return (
          <div key={index} className={styles.field}>
            <label className={styles.label}>{turkishFields[key]}:</label>
            {key === "bio" ?
              (<textarea className={styles.input} value={fieldVal} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />)
              : (
                <input className={styles.input} type="text" value={fieldVal} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />)
            }
          </div>
        )
      })
      }
      <div className={styles.field}>
        <button
          className="g--btn"
          type="submit"
          onClick={async (e) => {
            await updateProfile(e);
          }}
        >
          Kaydet
        </button>
      </div>
    </form>
  )
}
