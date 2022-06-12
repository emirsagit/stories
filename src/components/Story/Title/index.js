import React from 'react'
import styles from "./storyTitle.module.css";
import Link from "next/link";

const Title = ({ story }) => {
  const categories = story.categories.map((category, index) => {
    return <Link href={`/hikayeler/${category.value}`} key={index}><a className={styles.link}><span>{category.label}</span></a></Link>
  })

  return (
    <div className={styles.container}>
      <div className="g--row">
        <h1>{story.title}</h1>
        <p>{new Date(story.createdAt.seconds * 1000).toLocaleDateString("tr")} tarihinde yayınlandı. İlgili kategoriler: {categories}</p>
      </div>
    </div>
  )
}

export default Title;