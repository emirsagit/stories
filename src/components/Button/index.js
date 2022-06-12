import React from "react";
import styles from "./button.module.css";

export default function Button({ type = "primary", size = "16", children, style }) {
  return (
    <button className={styles.btn + " " + styles[type]} style={{ fontSize: size, ...style }}>
      {children}
    </button>
  );
}
