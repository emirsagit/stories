import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRef, useState } from "react";
import {
  setDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  addDoc
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { db, storage, firebase } from "../../../utils/firebase";
import useAuth from "../../hooks/useAuth";
import Resizer from "react-image-file-resizer";
import useEmojiPicker from "../../hooks/useEmojiPicker";

function Input({ removeSelectedUser, messageUser, messages, lastMessages, dm, loading, setLoading }) {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useAuth();
  const inputRef = useRef(null);
  const { convertEmojiToString, handleEmojiClose, handleEmojiShow, showEmojis, EmojiPicker } = useEmojiPicker();

  console.log(lastMessages)

  const createMessage = async () => {
    const docRef = doc(db, "dm", user.uid + '-' + messageUser.uid);

    if (!dm) {
      await setDoc(docRef, {
        id: docRef.id,
        users: { [user.uid]: user.uid, [messageUser.uid]: messageUser.uid },
        usersInfo: {
          [user.uid]: {
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL
          },
          [messageUser.uid]: {
            displayName: messageUser.displayName,
            uid: messageUser.uid,
            photoURL: messageUser.photoURL
          },
        },
        text: input,
        timestamp: serverTimestamp()
      });
      const messagesRef = doc(db, 'dm', docRef.id, 'messages', "message1");

      await setDoc(messagesRef, {
        id: messagesRef.id,
        isReadedBy: [user.uid], 
        messages: [
          {
            sender: user.uid,
            receiver: messageUser.uid,
            text: input,
            createdAt: new Date()
          }
        ],
        timestamp: serverTimestamp()
      });
    } else {
      // get only numbers from string
      const messagesId = messages.id.match(/\d+/g).map(Number).join("");
      const newMessageId = "message" + (parseInt(messagesId) + 1);

      const messagesRef = doc(db, 'dm', dm.id, 'messages', newMessageId);

      await setDoc(messagesRef, {
        id: messagesRef.id,
        isReadedBy: [user.uid], 
        messages: [
          {
            sender: user.uid,
            receiver: messageUser.uid,
            text: input,
            createdAt: new Date()
          }
        ],
        timestamp: serverTimestamp()
      });
    }
  }

  const updateMessage = async () => {
    if (lastMessages.messages.length > 4) {
      await createMessage();
    } else { 
      const messagesRef = doc(db, 'dm', dm.id, 'messages', lastMessages.id);
      await updateDoc(messagesRef, {
        isReadedBy: [user.uid],
        messages: [
          ...lastMessages.messages,
          {
            sender: user.uid,
            receiver: messageUser.uid,
            text: input,
            createdAt: new Date()
          }
        ]
      });
    }
  }


  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    if (!dm) {
      await createMessage();
    } else {
      await updateMessage();
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    handleEmojiClose();
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        60,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const addEmoji = async (event, emojiObject) => {
    const emoji = await convertEmojiToString(event, emojiObject);
    setInput(input + emoji);
    handleEmojiClose();
    inputRef.current.focus();
  };

  return (
    <>
      <div></div>
      <div
        className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${loading && "opacity-60"
          }`}
      >
        <img
          src={user?.photoURL}
          alt=""
          className="h-8 w-8 rounded-full cursor-pointer"
        />
        <div className="divide-y divide-gray-700 w-full">
          <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Neler oldu?"
              rows="2"
              ref={inputRef}
              className="bg-transparent outline-none text-[#d9d9d9] text-lg 
            placeholder-gray-500 tracking-wide w-full min-h-[50px]"
            />
          </div>
          {!loading && (
            <div className="flex items-center justify-between pt-2.5">
              <div className="flex items-center">
                <div className="icon" onClick={() => handleEmojiShow()}>
                  <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                </div>

                {showEmojis && (
                  <EmojiPicker handleEmojiClick={addEmoji} />
                )}
              </div>
              <button
                className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 
              font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] 
              disabled:opacity-50 disabled:cursor-default"
                disabled={!input && !selectedFile}
                onClick={sendPost}
              >
                Kaydet
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Input;
