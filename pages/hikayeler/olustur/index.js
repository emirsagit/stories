import React, { useState } from 'react'
import Layout from '../../../src/components/Layout'
import Select from 'react-select'
import useCategory from '../../../src/hooks/useCategory';
import styles from "./create-stories.module.css";
import DraftEditor from './DraftEditor';
import { setDoc, collection, doc } from "firebase/firestore";
import { db } from '../../../utils/firebase';
import useAuth from '../../../src/hooks/useAuth';
import slugify from 'react-slugify';

export default function Olustur() {
  const [form, setForm] = useState({ title: "", content: "", selectedCategories: [] });
  const options = [];
  const { categories } = useCategory();
  const { user } = useAuth();

  const onEditorStateChange = (editorState) => {
    setForm({ ...form, content: editorState });
  };

  if (categories.size !== 0) {
    categories.forEach(doc => {
      const category = doc.data();
      options.push({ value: category.value, label: category.label });
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }

  const handleSelectChange = (value) => {
    setForm({ ...form, "selectedCategories": value })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(collection(db, "stories"));

      await setDoc(docRef, {
        id: docRef.id,
        title: form.title,
        slug: slugify(form.title),
        content: form.content,
        categories: form.selectedCategories,
        createdAt: new Date(),
        isApproved: true,
        userId: user.uid,
        user: {
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL
        },
        comments: [],
        likes: []
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
    }
  }

  const { title, content, selectedCategories } = form;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.row}>
          <h1 className={styles.title}>Hikaye Olu??tur</h1>
          <form className={styles.form} onSubmit={onSubmitHandler}>
            <div className={styles.field}>
              <label className={styles.label}>Yaz?? Ba??l??????</label>
              <input className={styles.input} placeholder="Ba??l??k" name="title" id="title" type="text" value={title} onChange={(e) => handleChange(e)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Kategoriler</label>
              <Select id="long-value-select" instanceId="long-value-select" name='selectedCategories' options={options} isMulti max={2} className="basic-multi-select" classNamePrefix="select" value={selectedCategories} onChange={handleSelectChange} />
            </div>
            <div>
              <div className={styles.field}>
                <label className={styles.label}>????erik</label>
                <DraftEditor content={content} onEditorStateChange={onEditorStateChange} />
              </div>
            </div>
            <button className="g--btn g--fs-lg" type='submit'>YAYINLA</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
