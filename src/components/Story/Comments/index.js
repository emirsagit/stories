import React from 'react'
import AddComment from './AddComment';
import styles from "./comments.module.css";

const Comments = ({ story }) => {
  console.log(story)
  return (
    <>
      <AddComment story={story} />
    </>
  )
}

export default Comments;