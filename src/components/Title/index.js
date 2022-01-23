import React from "react";
import styles from "./title.module.css";
import Image from "next/image";

export default function Title() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1 className={styles.h1}>HER HAFTA YENİ HİKAYE...</h1>
        <p className={styles.p}>Hikayeler yazarak yazar olma yolunda ilk adımınızı atın... Profesyonel editörlerimizin dikkatini çekin.</p>
      </div>
      <div className={styles.image}>
        <Image src="/images/writing.png" alt="" width={467} height={715} />
      </div>
    </div>
  );
}
