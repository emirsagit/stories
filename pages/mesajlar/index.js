import Head from "next/head";
import { Layout } from "../../src/components";
import Sidebar from "../../src/components/Messages/Sidebar";
import Feed from "../../src/components/Messages/Feed";
import Widgets from "../../src/components/Messages/Widgets";
import Modal from "../../src/components/Messages/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../../src/components/atoms/modalAtom";
import useAuth from "../../src/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Mesajlar({ data }) {

  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

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
          <div className="flex bg-gray-900 min-h-screen max-w-[1200px] mx-auto">
            <Sidebar />
            <Feed />
            {/* Reklam Alanı */}
            {/* <Widgets /> */}
            {isOpen && <Modal />}
          </div>
        </>
      </Layout>
    </div>
  );
}