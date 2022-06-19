import React from "react";
import styles from "./likes.module.css";
import { HiThumbUp, HiOutlineThumbUp, HiOutlineChatAlt } from "react-icons/hi";

export default function LikesComments({ story, handleAddOrRemoveLikes, isLiked, fontSize, style }) {

  const likedSum = story.likes?.length || 0;
  const commentsSum = story.comments?.length || 0;

  return (
    <div className={`g--row ${styles.row}`} style={style}>
      <button className={`${styles.wrapper} ${isLiked && styles.liked}`} title="beğen" style={fontSize} onClick={handleAddOrRemoveLikes}>
        {isLiked ?
          <HiThumbUp />
          :
          <HiOutlineThumbUp />
        }
        {likedSum > 0 ? <>{likedSum} <span className="gl-d-sm-none">beğeni</span></> : <span className="gl-d-sm-none">Beğen</span>}
      </button>
      <a href="#comments" className={styles.wrapper} style={fontSize}>
        <HiOutlineChatAlt />
        {commentsSum > 0 ? <>{commentsSum}<span className="gl-d-sm-none"> yorum</span></> : <span className="gl-d-sm-none">Yorum Yap</span>}
      </a>
    </div>
  );
}
