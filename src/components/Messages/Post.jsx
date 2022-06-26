import {
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "@firebase/firestore";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { db } from "../../../utils/firebase";
import useAuth from "../../hooks/useAuth";
import { modalState, postIdState } from "../atoms/modalAtom";

function Post({ id, post, postPage }) {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const commentsLength = post ? post.comments?.length : 0;
  const likesLength = post ? post.likes?.length : 0;
  const isLiked = post ? post.likes?.includes(user?.uid) : false;

  const likePost = async () => {
    console.log(id);
    const tweetRef = doc(db, "tweets", id);

    if (isLiked) {
      await updateDoc(tweetRef, {
        likes: arrayRemove(user.uid)
      });
    } else {
      await updateDoc(tweetRef, {
        likes: arrayUnion(user.uid)
      });
    }
  };

  return (
    <div
      className="p-3 flex cursor-pointer border-b border-gray-700"
      onClick={() => router.push(`/mesajlar/${id}`)}
    >
      {!postPage && (
        <img
          src={post?.user.photoURL}
          alt=""
          className="h-11 w-11 rounded-full mr-4"
        />
      )}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              src={post?.user.photoURL}
              alt="Profile Pic"
              className="h-11 w-11 rounded-full mr-4"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${!postPage && "inline-block"
                  }`}
              >
                {post?.user.displayName}
              </h4>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
            {!postPage && (
              <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                {post?.text}
              </p>
            )}
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        {postPage && (
          <p className="text-[#d9d9d9] mt-0.5 text-xl">{post?.text}</p>
        )}
        <img
          src={post?.image}
          alt=""
          className="rounded-2xl max-h-[200px] object-contain mr-2"
        />
        <div
          className={`text-[#6e767d] flex flex-start gap-12 w-10/12 ${postPage && "mx-auto"
            }`}
        >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id);
              setIsOpen(true);
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {commentsLength > 0 && (
              <span className="group-hover:text-[#ebf4fa] text-sm">
                {commentsLength}
              </span>
            )}
          </div>

          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              {isLiked ? (
                <HeartIconFilled className="h-5 text-red-900" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likesLength > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                  }`}
              >
                {likesLength}
              </span>
            )}
          </div>

          {user?.uid === post?.user.uid && (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "tweets", id));
                router.push("/mesajlar");
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          )}

          {/* <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Post;
