import React, { useState } from 'react'
import Button from '../../../Button';
import styles from "./addComment.module.css";
import LikesComments from "../../../LikesComments";

const AddComment = ({ story }) => {
  const [comment, setComment] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      story.addComment(comment);
      setComment('');
    }
  }

  return (
    <form className={`g--row ${styles.container}`} onSubmit={onSubmitHandler}>
      <div className={styles.field}>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} className={styles.input} rows="8" cols="50" placeholder='Yazı ile ilgili yorum yap' />
        <div>
          <LikesComments story={story} />
          <Button onClick={onSubmitHandler} className={styles.button} style={{ marginLeft: "auto" }}>YORUMU KAYDET</Button>
        </div>
      </div>
    </form>
  )
}

export default AddComment;