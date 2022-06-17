import React, { useState } from 'react'
import { db } from "../utils/firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import styles from "./story.module.css";
import Head from "next/head";
import { Layout } from '../src/components';
import Title from '../src/components/Story/Title';
import Content from '../src/components/Story/Content';
import Comments from '../src/components/Story/Comments';
import useAuth from '../src/hooks/useAuth';
import LikesComments from '../src/components/LikesComments';

const getData = async (id) => {
  const storiesRef = doc(db, "stories", id);
  const docSnap = await getDoc(storiesRef);
  if (docSnap.exists) {
    return docSnap.data();
  } else {
    return false;
  }
}

export default function Story({ data }) {

  const { isAuthenticated, user } = useAuth();
  
  const [story, setStory] = useState(JSON.parse(data));

  const isLiked = isAuthenticated ? story?.likes?.includes(user?.uid) : false;

  const handleAddOrRemoveLikes = async () => {
    const storyRef = doc(db, "stories", story.id);

    if (isLiked) {
      await updateDoc(storyRef, {
        likes: arrayRemove(user.uid)
      });
      const newLikes = story.likes.filter(id => id !== user.uid);
      setStory({ ...story, likes: newLikes });
    } else {
      await updateDoc(storyRef, {
        likes: arrayUnion(user.uid)
      });
      const newLikes = [...story.likes, user.uid];
      setStory({ ...story, likes: newLikes });
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Next + Firebase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.container}>
          <Title story={story} />
          <Content story={story} handleAddOrRemoveLikes={handleAddOrRemoveLikes} isLiked={isLiked}/>
          <Comments story={story} />
        </div>
      </Layout>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  // Fetch data from external API
  try {
    const { id } = params;
    const data = await getData(id);
    if (data) {
      return { props: { data: JSON.stringify(data) } };
    } else {
      return {
        notFound: true,
      }
    }
  } catch (error) {
    console.log(error);
  }
}