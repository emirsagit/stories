import Head from "next/head";
import { Layout, Title, Featured } from "../src/components";

export default function Home() {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Next + Firebase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title />
        <Featured />
      </Layout>
    </div>
  );
}
