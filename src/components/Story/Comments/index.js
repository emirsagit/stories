import React, { useEffect, useState } from 'react'
import AddComment from './AddComment';
import styles from "./comments.module.css";
import Comment from './Comment';

const Comments = ({ story }) => {
  const [comments, setComments] = useState(story.comments);

  const addNewCommentToDom = (comment) => {
    setComments([...comments, comment]);
  }

  console.log(comments);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const getData = async () => {
    const res = await fetch("./data/data.json");
    const data = await res.json();
    updateComments(data.comments);
  };

  // update score
  let updateScore = (score, id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.score = score;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((data) => {
          if (data.id === id) {
            data.score = score;
          }
        });
      });
    }
    updateComments(updatedComments);
  };

  // add comments
  let addComment = (newComment) => {
    let updatedComments = [...comments, newComment];
    updateComments(updatedComments);
  };



  console.log(story)
  return (
    <>
      <AddComment story={story} addNewCommentToDom={addNewCommentToDom} />
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </>
  )
}

export default Comments;