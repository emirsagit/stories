import React from "react";
import styles from "./likes.module.css";
import { HiThumbUp, HiOutlineThumbUp, HiOutlineChatAlt } from "react-icons/hi";

export default function LikesComments({ story, handleAddOrRemoveLikes, isLiked, fontSize }) {

  const likedSum = story.likes?.length || 0;
  const commentsSum = story.comments?.length || 0;

  return (
    <div className={`g--row ${styles.row}`}>
      <button className={`${styles.wrapper} ${isLiked && styles.liked}`} title="beğen" style={fontSize} onClick={handleAddOrRemoveLikes}>
        {isLiked ?
          <HiThumbUp />
          :
          <HiOutlineThumbUp />
        }
        {likedSum > 0 ? <span>{likedSum} beğeni</span> : <span>Beğen</span>}
      </button>
      <a href="#comments" className={styles.wrapper} style={fontSize}>
        <HiOutlineChatAlt />
        {commentsSum > 0 ? <span>{commentsSum} yorum</span> : <span>Yorum Yap</span>}
      </a>
    </div>
  );
}
