import Head from "next/head";
import { Layout } from "../../src/components";
import Sidebar from "../../src/components/Chat/Sidebar";
import Feed from "../../src/components/Chat/Feed";
import Modal from "../../src/components/Chat/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../../src/components/atoms/modalAtom";
import useAuth from "../../src/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Mesajlar({ data }) {

  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [messageUser, setMessageUser] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated])

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Next + Firebase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <>
          <header>
            <title>Home/ TwitterClone</title>
          </header>
          <div className="flex bg-gray-900 g--h-screen max-w-[1200px] mx-auto">
            <Sidebar />
            <Feed messageUser={messageUser} setMessageUser={setMessageUser} />
            {/* Reklam Alanı */}
            {/* <Widgets /> */}
            {isOpen && <Modal />}
          </div>
        </>
      </Layout>
    </div>
  );
}