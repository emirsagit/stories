import React from 'react'
import Author from '../../Author';
import LikesComments from '../../LikesComments';
import Body from '../Body';
import styles from "./storyContent.module.css";

const Content = ({ story }) => {
  return (
    <>
      <Author user={story.user} />
      <LikesComments story={story} />
      <Body story={story}/>
    </>
  )
}

export default Content;