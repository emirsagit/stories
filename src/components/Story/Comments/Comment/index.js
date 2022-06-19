import React, { useState } from 'react'
import styles from "./comment.module.css";
import CommentAuthor from './CommentAuthor';

const Comment = ({ comment }) => {
  return (
    <div className={`g--row ${styles.container}`}>
      <div className={styles.field}>
        <CommentAuthor comment={comment} style={{ justifyContent: "space-between" }} titleAlign={{ marginRight: "auto" }} />
        <p className={styles.content}>{comment.content}</p>
      </div>
    </div>
  )
}

export default Comment;