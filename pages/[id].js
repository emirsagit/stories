import React, { useState } from 'react'
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "./story.module.css";
import Head from "next/head";
import { Layout } from '../src/components';
import Title from '../src/components/Story/Title';
import Content from '../src/components/Story/Content';
import Comments from '../src/components/Story/Comments';

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
  const [story, setStory] = useState(JSON.parse(data));

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
          <Content story={story} />
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