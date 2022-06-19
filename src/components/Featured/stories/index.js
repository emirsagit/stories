import React, { useEffect } from "react";
import styles from "./stories.module.css";
import Link from "next/link";
import Button from "../../Button";
import InterweaveContent from "../../InterweaveContent.js";
import LikesComments from "../../LikesComments";
import Image from "next/image";

export default function Stories({ stories }) {

  return (
    <div className={styles.stories}>
      <h2>Öne Çıkan Hikayeler</h2>
      <hr className="g--hr" />
      {stories.map((story, index) => {
        return (
          <Link href={`/${story.id}`} key={index}>
            <a className={styles.story}>
              <div className={styles.storyHeaderContainer}>
                <p className={styles.title}> 
              <img src={story.user.photoURL} loading="lazy" className={styles.image} width={22.4} height={22.4}/>
                {story.title} by <span className={styles.authorName}>{story.user.displayName}</span></p>
              </div>
              <InterweaveContent content={story.content} sliceSize={400} />
              <div className={styles.meta}>
                <LikesComments story={story} style={{  marginRight: "auto", width: "100%", paddingLeft: 0 }} />
                <Button size={12}>Devamı</Button>
              </div>
            </a>
          </Link>
        );
      }
      )}
    </div>
  );
}


