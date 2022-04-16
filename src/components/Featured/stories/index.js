import React from "react";
import styles from "./stories.module.css";
import Link from "next/link";
import Button from "../../Button";

export default function Stories() {
  return (
    <div className={styles.stories}>
      <h2>Öne Çıkan Hikayeler</h2>
      <Link href="/">
        <a className={styles.story}>
          <p className={styles.title}>Story Name</p>
          <p>Ex officia elit et minim cillum minim veniam commodo elit sit cillum in. Aliquip adipisicing ex incididunt amet consectetur anim Lorem ipsum aliqua non consectetur minim nostrud. </p>
          <div className={styles.meta}>
            <Button size={12}>Devamı</Button>
            <p className={styles.author}>Emir Sağıt</p>
          </div>
        </a>
      </Link>
      <Link href="/">
        <a className={styles.story}>
          <p className={styles.title}>Story Name</p>
          <p>Ex officia elit et minim cillum minim veniam commodo elit sit cillum in. Aliquip adipisicing ex incididunt amet consectetur anim Lorem ipsum aliqua non consectetur minim nostrud. </p>
          <div className={styles.meta}>
            <button className="g--btn">Devamı</button>
            <p className={styles.author}>Emir Sağıt</p>
          </div>
        </a>
      </Link>
      <Link href="/">
        <a className={styles.story}>
          <p className={styles.title}>Story Name</p>
          <p>Ex officia elit et minim cillum minim veniam commodo elit sit cillum in. Aliquip adipisicing ex incididunt amet consectetur anim Lorem ipsum aliqua non consectetur minim nostrud. </p>
          <div className={styles.meta}>
            <button className="g--btn">Devamı</button>
            <p className={styles.author}>Emir Sağıt</p>
          </div>
        </a>
      </Link>
    </div>
  );
}
