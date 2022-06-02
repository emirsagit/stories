import React, { useEffect, useState } from 'react'
import Layout from '../../../src/components/Layout'
import Select from 'react-select'
import useCategory from '../../../src/hooks/useCategory';
import styles from "./create-stories.module.css";
import DraftEditor from './DraftEditor';


export default function Olustur() {
  const [form, setForm] = useState({ title: "", content: "", selectedCategories: [] });
  const options = [];
  const { categories } = useCategory();

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
    console.log(value);
    setForm({ ...form, "selectedCategories": value })
  }

  const { title, content, selectedCategories } = form;

  console.log(selectedCategories);
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.row}>
          <h1 className={styles.title}>Hikaye Oluştur</h1>
          <form className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Yazı Başlığı</label>
              <input className={styles.input} placeholder="Başlık" type="text" value={title} onChange={(e) => handleChange(e)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Kategoriler</label>
              <Select name='selectedCategories' options={options} isMulti max={2} className="basic-multi-select" classNamePrefix="select" value={selectedCategories}
                onChange={handleSelectChange} />
            </div>
            <div>
              <div className={styles.field}>
                <label className={styles.label}>İçerik</label>
                <DraftEditor content={content} onEditorStateChange={onEditorStateChange}/>
              </div>
            </div>
            <button className="g--btn g--fs-lg">EDİTOR ONAYINA GÖNDER</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
