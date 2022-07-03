import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Post from "../../src/components/Messages/Post";
import Sidebar from "../../src/components/Messages/Sidebar";
import useAuth from "../../src/hooks/useAuth";
import Modal from "../../src/components/Messages/Modal";
import Comment from "../../src/components/Messages/Comment";
import Widgets from "../../src/components/Messages/Widgets";
import { modalState } from "../../src/components/atoms/modalAtom";
import { db } from "../../utils/firebase";
import { Layout } from "../../src/components";

const PostPage = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query)
  const [post, setPost] = useState("");

  const comments = post ? post.comments : [];

  useEffect(() => {
    if (id && !post) {
      onSnapshot(doc(db, "tweets", id), (snapshot) => {
        setPost(snapshot.data());
      });
    }
  }, [db, id])

  return (
    <div>
      <Head>
        <title>
          {post?.username} on Twitter: &quot;{post?.text}&quot;
        </title>
        <link rel="icon" href="/twitter.svg" />
      </Head>
      <Layout>
        <main className="bg-gray-900 min-h-screen flex max-w-[1500px] mx-auto">
          <Sidebar />
          <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
            <div
              className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] 
          font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-gray-800"
            >
              <div
                className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                onClick={() => router.push("/mesajlar")}
              >
                <ArrowLeftIcon className="h-5 text-white" />
              </div>
              ABC Girdi
            </div>
            {post && (
              <Post id={id} post={post} postPage />
            )}
            {comments.length > 0 && (
              <div className="pb-72">
                {comments.map((comment, index) => (
                  <Comment
                    key={index}
                    comment={comment}
                    commentIndex={index}
                    postId={id}
                    post={post}
                  />
                ))}
              </div>
            )}
          </div>
          {/* <Widgets /> */}
          {/* Reklam Alanı */}
          {isOpen && <Modal />}
        </main>
      </Layout>
    </div>
  );
};


export default PostPage;
