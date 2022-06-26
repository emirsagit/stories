import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled
} from "@heroicons/react/solid";
import Moment from "react-moment";
import useAuth from "../../hooks/useAuth";
import {
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion
} from "@firebase/firestore";
import { db } from "../../../utils/firebase";


const Comment = ({ comment, postId, commentIndex, post }) => {
  const { user, isAuthenticated } = useAuth();
  const likesLength = comment ? comment.likes?.length : 0;
  let isLiked = true;

  if (isAuthenticated) {
    // console.log(comment.likes?.includes(user.uid));
    isLiked = comment ? comment.likes?.includes(user.uid) : false;
  }

  const likeComment = async () => {
    const tweetRef = doc(db, "tweets", postId);

    if (isLiked) {
      const newComments = post.comments.map((comment, index) => {
        if (index === commentIndex) {
          return {
            ...comment,
            likes: comment.likes.filter(like => like !== user.uid)
          };
        }
        return comment;
      }
      );
      await updateDoc(tweetRef, {
        "comments": newComments
      });
    } else {
      const newComments = post.comments.map((comment, index) => {
        if (index === commentIndex) {
          const likes = [...comment.likes, user.uid];
          console.log(likes)
          return {
            ...comment,
            likes: likes
          };
        }
        return comment;
      });
      await updateDoc(tweetRef, {
        "comments": newComments
      });
    }
  };

  const removeComment = async (e) => {
    e.stopPropagation();
    await updateDoc(doc(db, "tweets", postId), {
      comments: arrayRemove(comment)
    });
  }

  console.log(comment);

  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
      <img
        src={comment?.user?.photoURL}
        alt=""
        className="h-11 w-11 rounded-full mr-4"
      />
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className="font-bold text-[#d9d9d9] text-[15px] sm:text-base 
              inline-block group-hover:underline"
              >
                {comment?.user?.displayName}
              </h4>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="text-[#d9d9d9] mt-0.5 max-w-lg scrollbar-hide text-[15px] sm:text-base">
              {comment?.content}
            </p>
          </div>
          <div className="icon group flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        <div className="text-[#6e767d] flex justify-start gap-12 w-10/12">
          <div className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likeComment();
            }}>
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              {isLiked ? (
                <HeartIconFilled className="h-5 text-red-900" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likesLength > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${isLiked && "text-red-600"
                  }`}
              >
                {likesLength}
              </span>
            )}
          </div>
          {user?.uid === comment?.user?.id && (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => removeComment(e)}>
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          )}
          {/* <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div> */}
          {/* <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
