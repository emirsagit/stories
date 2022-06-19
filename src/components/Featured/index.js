import React from "react";
import styles from "./featured.module.css";
import Stories from "./stories";
import Authors from "./authors";

export default function Featured({stories}) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Stories styles={styles} stories={stories}/>
        <Authors />
      </div>
    </div>
  );
}
