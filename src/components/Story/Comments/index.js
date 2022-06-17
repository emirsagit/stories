import React, { useEffect, useState } from 'react'
import AddComment from './AddComment';
import styles from "./comments.module.css";
import Comment from './Comment';

const Comments = ({ story }) => {
  const [comments, setComments] = useState(story.comments);

  const addNewCommentToDom = (comment) => {
    setComments([...comments, comment]);
  }

  return (
    <div className={styles.commentsContainer}>
      <AddComment story={story} addNewCommentToDom={addNewCommentToDom} />
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  )
}

export default Comments;