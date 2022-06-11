import Head from "next/head";
import { Layout, Title, Featured } from "../src/components";
import { db } from "../utils/firebase";
import { collection, query, orderBy, limit, where, getDocs } from "firebase/firestore";

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Next + Firebase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title />
        <Featured stories={JSON.parse(data)}/>
      </Layout>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const storiesRef = collection(db, 'stories');
    const q = query(storiesRef, where("isApproved", "==", true), orderBy('createdAt', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    let data = querySnapshot.docs.map((doc) => {
      return doc.data();
    });
    data = JSON.stringify(data);
    // Pass data to the page via props
    return { props: { data } }
  } catch (error) {
    console.log(error);
  }
}
