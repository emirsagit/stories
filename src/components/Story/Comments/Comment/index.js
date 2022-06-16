import React, { useState } from 'react'
import Author from '../../../Author';
import styles from "./comment.module.css";

const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <div className={`g--row ${styles.container}`}>
      <div className={styles.field}>
        <Author user={comment.user} style={{ justifyContent: "space-between" }} titleAlign={{ marginRight: "auto" }} />
      </div>
    </div>
  )
}

export default Comment;