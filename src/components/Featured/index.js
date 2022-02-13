import React from "react";
import styles from "./featured.module.css";
import Link from "next/link";
import Stories from "./stories";
import Button from "../Button";

export default function Featured() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Stories styles={styles} />
        <div className={styles.authors}>
          <div className={styles.meta}>
            <h2>Yazarlar</h2>
            <Link href="/">
              <a className={styles.link}>Tamamı</a>
            </Link>
          </div>
          <ul className={styles.list}>
            <li className={styles.author}>
              <p>
                #1. Emir Sağıt <br />
                <span className={styles.span}>10000 Puan</span>
              </p>
              <Button type="secondary" size={12}>Takip</Button>
            </li>
            <li className={styles.author}>
              <p>
                #1. Emir Sağıt <br />
                <span className={styles.span}>10000 Puan</span>
              </p>
              <button className={styles.btn}>Takip</button>
            </li>
            <li className={styles.author}>
              <p>
                #1. Emir Sağıt <br />
                <span className={styles.span}>10000 Puan</span>
              </p>
              <button className={styles.btn}>Takip</button>
            </li>
            <li className={styles.author}>
              <p>
                #1. Emir Sağıt <br />
                <span className={styles.span}>10000 Puan</span>
              </p>
              <button className={styles.btn}>Takip</button>
            </li>
            <li className={styles.author}>
              <p>
                #1. Emir Sağıt <br />
                <span className={styles.span}>10000 Puan</span>
              </p>
              <button className={styles.btn}>Takip</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
