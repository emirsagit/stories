import React from 'react'
import Author from '../../Author';
import LikesComments from '../../LikesComments';
import Body from '../Body';
import styles from "./storyContent.module.css";

const Content = ({ story, handleAddOrRemoveLikes, isLiked }) => {
  return (
    <>
      <Author user={story.user} />
      <LikesComments story={story} handleAddOrRemoveLikes={handleAddOrRemoveLikes} isLiked={isLiked}/>
      <Body story={story} handleAddOrRemoveLikes={handleAddOrRemoveLikes} isLiked={isLiked}/>
    </>
  )
}

export default Content;