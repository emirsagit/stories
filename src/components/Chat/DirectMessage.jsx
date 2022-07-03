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
import { db } from "../../../utils/firebase";
import useAuth from "../../hooks/useAuth";

function DirectMessage({ id, message, dm }) {
  const { user } = useAuth();
  console.log(message);
  console.log(dm);

  const sender = dm.usersInfo[message.sender];
  const text = message.text;
  const timestamp = message.timestamp;
  const isAuthUserSender = sender.uid === user.uid;

  console.log("sed", isAuthUserSender)

  const router = useRouter();

  return (
    <div
      className="p-3 flex border-b border-gray-700 mx-auto"
    >
      <div className={`flex flex-row p-2 rounded-lg justify-between space-y-2 gap-2 w-full ${isAuthUserSender ? "ml-6 flex-row-reverse bg-gray-800" : "mr-6"}`}>
        <p className="text-[#d9d9d9] mt-0.5 text-md">{text}</p>
        <div className={`flex-shrink-0 ${isAuthUserSender ? "mr-auto" : "ml-auto"}`}>
          <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      </div>
      <img
        src={message?.image}
        alt=""
        className="rounded-2xl max-h-[200px] object-contain mr-2"
      />
    </div>
  );
}

export default DirectMessage;
