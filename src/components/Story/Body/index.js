import React from 'react'
import InterweaveContent from '../../InterweaveContent.js';
import LikesComments from '../../LikesComments/index.js';
import styles from "./body.module.css";
import SocialShare from './SocialShare.js';
import Author from '../../Author';

const Body = ({ story, handleAddOrRemoveLikes, isLiked }) => {

  return (
    <div className={`g--row ${styles.container}`}>
      <InterweaveContent content={story.content} />
      <SocialShare />
      <div className={styles.footer}>
        <div className={styles.buttons}>
          <LikesComments fontSize={{ fontSize: "21px" }} story={story} handleAddOrRemoveLikes={handleAddOrRemoveLikes} isLiked={isLiked} />
          <button className={styles.report}>Report</button>
        </div>
        <time dateTime={new Date(story.createdAt.seconds * 1000).toLocaleDateString("tr")}>{new Date(story.createdAt.seconds * 1000).toLocaleDateString("tr")}</time>
      </div>
      <div className={styles.authorContainer}>
        <Author user={story.user} style={{ justifyContent: "space-between" }} titleAlign={{ marginRight: "auto" }} />
      </div>
    </div>
  )
}

export default Body;