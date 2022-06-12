import React, { useEffect } from "react";
import styles from "./stories.module.css";
import Link from "next/link";
import Button from "../../Button";
import InterweaveContent from "../../InterweaveContent.js";

export default function Stories({ stories }) {

  return (
    <div className={styles.stories}>
      <h2>Öne Çıkan Hikayeler</h2>
      <hr className="g--hr" />
      {stories.map((story, index) => {
        return (
          <Link href={`/${story.id}`} key={index}>
            <a className={styles.story}>
              <p className={styles.title}>{story.title}</p>
              <InterweaveContent content={story.content} sliceSize={400}/>
              <div className={styles.meta}>
                <Button size={12}>Devamı</Button>
                <p className={styles.author}>Emir Sağıt</p>
              </div>
            </a>
          </Link>
        );
      }
      )}
    </div>
  );
}


