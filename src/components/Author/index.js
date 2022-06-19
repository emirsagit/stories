import Image from "next/image";
import React from "react";
import styles from "./author.module.css";
import Link from "next/link";
import Button from "../Button";
import Follow from "../Button/Follow";

export default function Author({ user, style, titleAlign }) {
  console.log(user);
  return (
    <div className={`g--row ${styles.row}`} style={style}>
      <div style={{ borderRadius: '20px', overflow: 'hidden', width: 40, height: 40 }}>
        <Image className={styles.avatar} layout="fixed" width={40} height={40} src={user.photoURL} alt={user.displayName} />
      </div>
      <Link href={`/yazarlar/${user.id}`}>
        <a className={styles.link} style={titleAlign}>
          <span>{user.displayName}</span>
        </a>
      </Link>
      <Follow contentUser={user} />
    </div>
  );
}
