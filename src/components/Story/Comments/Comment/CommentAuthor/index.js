import Image from "next/image";
import React from "react";
import styles from "./author.module.css";
import Link from "next/link";

export default function CommentAuthor({ comment, style, titleAlign }) {
  const time = comment.createdAt.seconds ? new Date(comment.createdAt.seconds * 1000).toLocaleDateString("tr") : new Date(comment.createdAt).toLocaleDateString("tr");

  console.log(comment);
  const { user, createdAt } = comment;
  return (
    <div className={`g--row ${styles.row}`} style={style}>
      <div style={{ borderRadius: '20px', overflow: 'hidden', width: 20, height: 20 }}>
        <Image className={styles.avatar} layout="fixed" width={20} height={20} src={user.photoURL} alt={user.name} />
      </div>
      <Link href={`/yazarlar/${user.id}`}>
        <a className={styles.link} style={titleAlign}>
          <span>{user.name}</span>
        </a>
      </Link>
      <time datetime={time}>{time}</time>
    </div>
  );
}
