import Head from "next/head";
import Link from "next/link";
import enableMessaging from "@/messaging/enableMessaging";
import { Layout } from "src/components";

export default function Home({ data }) {
  //{data} is from getStaticProps() exported below.
  console.log(data);
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Next + Firebase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>children</Layout>
      {/* <button className="bg-coral p-2 rounded shadow font-extrabold text-navy" onClick={enableMessaging}>
          📩 Enable Messaging
        </button> */}
    </div>
  );
}

export async function getStaticProps(context) {
  //Note: Do not use client functions here!

  //getDoc function is from Admin SDK.
  const data = await import("@/FS-admin-functions").then(({ getDoc }) => getDoc());

  return {
    props: { data }, // will be passed to the page component as props
  };
}
