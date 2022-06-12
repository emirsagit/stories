import Image from "next/image";
import React from "react";
import styles from "./likes.module.css";
import { HiThumbUp, HiOutlineThumbUp, HiOutlineChatAlt } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";

export default function LikesComments({ story }) {

  const { user, isAuthenticated } = useAuth();

  const isLiked = isAuthenticated ? story.likes?.includes(user?.id) : false;
  const likedSum = story.likes?.length || 0;
  const commentsSum = story.comments?.length || 0;

  return (
    <div className={`g--row ${styles.row}`}>
      <button className={`${styles.wrapper} ${isLiked && styles.liked}`} title="beğen">
        {isLiked ?
          <HiThumbUp />
          :
          <HiOutlineThumbUp />
        }
        {likedSum > 0 ? <span>{likedSum} beğeni</span> : <span>Beğen</span>}
      </button>
      <a href="#comments" className={styles.wrapper}>
        <HiOutlineChatAlt />
        {commentsSum > 0 ? <span>{commentsSum} yorum</span> : <span>Yorum Yap</span>}
      </a>
    </div>
  );
}
