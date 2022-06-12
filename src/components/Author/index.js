import Image from "next/image";
import React from "react";
import styles from "./author.module.css";
import Link from "next/link";
import Button from "../Button";

export default function Author({ user, style, titleAlign }) {
  return (
    <div className={`g--row ${styles.row}`} style={style}>
      <div style={{ borderRadius: '20px', overflow: 'hidden', width: 40, height: 40 }}>
        <Image className={styles.avatar} layout="fixed" width={40} height={40} src={user.photoURL} alt={user.name} />
      </div>
      <Link href={`/yazarlar/${user.id}`}>
        <a className={styles.link} style={titleAlign}>
          <span>{user.name}</span>
        </a>
      </Link>
      <Button type="primary-outline" size={12}>TAKİP</Button>
    </div>
  );
}
