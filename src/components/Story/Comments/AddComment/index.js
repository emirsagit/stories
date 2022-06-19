import React, { useState } from 'react'
import Button from '../../../Button';
import styles from "./addComment.module.css";
import useAuth from '../../../../hooks/useAuth';
import { db } from '../../../../../utils/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const AddComment = ({ story ,addNewCommentToDom }) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if(newComment.trim().length < 3) return;

    const storyRef = doc(db, "stories", story.id);

    const comment = {
      content: newComment,
      score: 0,
      createdAt: new Date(),
      isValid: true,
      user: {
        id: user.uid,
        name: user.displayName,
        photoURL: user.photoURL
      }
    }
    // Set the "capital" field of the city 'DC'
    // Atomically add a new region to the "regions" array field.
    await updateDoc(storyRef, {
      comments: arrayUnion(comment)
    });

    addNewCommentToDom(comment);
  }

  return (
    <form className={`g--row ${styles.container}`} onSubmit={onSubmitHandler} id="comments">
      <div className={styles.field}>
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className={styles.input} rows="8" cols="50" placeholder='Yazı ile ilgili yorum yap' />
        <div>
          <Button onClick={onSubmitHandler} className={styles.button} style={{ marginLeft: "auto" }}>YORUMU KAYDET</Button>
        </div>
      </div>
    </form>
  )
}

export default AddComment;