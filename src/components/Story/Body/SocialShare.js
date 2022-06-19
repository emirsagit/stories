import React from 'react'
import styles from "./body.module.css";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { useRouter } from 'next/router'


const SocialShare = ({ story, handleAddOrRemoveLikes, isLiked }) => {
  const { asPath } = useRouter();
  const link = process.env.NEXT_PUBLIC_BASE_URL + asPath;

  return (
    <>
      <div className={styles.share}>
        <a className="btn-floating btn btn-tw" type="button" role="button" title="Share on twitter"
          href={`https://twitter.com/intent/tweet?url=${link}`} target="_blank"
          rel="noopener">
          <FaTwitter />
          <p>Twitter</p>
        </a>
        <a className="btn-floating btn btn-tw" type="button" role="button" title="Share on facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} target="_blank"
          rel="noopener">
          <FaFacebookF />
          <p>Facebook</p>
        </a>
      </div>
    </>
  )
}

export default SocialShare;