import React from 'react'
import InterweaveContent from '../../InterweaveContent.js';
import styles from "./body.module.css";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { useRouter } from 'next/router'
import Author from '../../Author/index.js';
import LikesComments from '../../LikesComments/index.js';

const Body = ({ story, handleAddOrRemoveLikes, isLiked }) => {
  const { asPath } = useRouter();
  const link = process.env.NEXT_PUBLIC_BASE_URL + asPath;

  return (
    <div className={`g--row ${styles.container}`}>
      <InterweaveContent content={story.content} />
      <div className={styles.share}>
        <a class="btn-floating btn btn-tw" type="button" role="button" title="Share on twitter"
          href={`https://twitter.com/intent/tweet?url=${link}`} target="_blank"
          rel="noopener">
          <FaTwitter />
          <p>Twitter</p>
        </a>
        <a class="btn-floating btn btn-tw" type="button" role="button" title="Share on facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} target="_blank"
          rel="noopener">
          <FaFacebookF />
          <p>Facebook</p>
        </a>
      </div>
      <div className={styles.footer}>
        <div className={styles.buttons}>
          <LikesComments fontSize={{ fontSize: "21px" }} story={story} handleAddOrRemoveLikes={handleAddOrRemoveLikes} isLiked={isLiked} />
          <button className={styles.report}>Report</button>
        </div>
        <time datetime={new Date(story.createdAt.seconds * 1000).toLocaleDateString("tr")}>{new Date(story.createdAt.seconds * 1000).toLocaleDateString("tr")}</time>
      </div>
      <div className={styles.authorContainer}>
        <Author user={story.user} style={{ justifyContent: "space-between" }} titleAlign={{ marginRight: "auto" }} />
      </div>
    </div>
  )
}

export default Body;