import React, { useEffect } from "react";
import styles from "./stories.module.css";
import Link from "next/link";
import Button from "../../Button";
import draftToHtml from 'draftjs-to-html';
import { Interweave } from "interweave";

export default function Stories({ stories }) {

  const convertDraftToHtml = (content) => {
    const markup = draftToHtml(content);
    return markup.slice(0, 1000);
  }

  return (
    <div className={styles.stories}>
      <h2>Öne Çıkan Hikayeler</h2>
      <hr className="g--hr" />
      {stories.map((story, index) => {
        return (
          <Link href={`/${story.id}`} key={index}>
            <a className={styles.story}>
              <p className={styles.title}>{story.title}</p>
              <Interweave content={convertDraftToHtml(story.content)} />
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
