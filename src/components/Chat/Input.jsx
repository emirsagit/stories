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

function Input({ removeSelectedUser, messageUser }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const { user } = useAuth();
  const inputRef = useRef(null);
  const { convertEmojiToString, handleEmojiClose, handleEmojiShow, showEmojis, EmojiPicker } = useEmojiPicker();

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);


    const docRef = doc(db, "dm", user.uid + '-' + messageUser.uid);

    await setDoc(docRef, {
      id: docRef.id,
      users: {[user.uid]: user.uid, [messageUser.uid]:messageUser.uid},
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

    const messagesRef = collection(db, 'dm', docRef.id, 'messages');

    await addDoc(messagesRef, {
      id: messagesRef.id,
      messages: [
        {
          sender: user.uid,
          receiver: messageUser.uid,
          isReaded: false,
          text: input,
          createdAt: new Date()
        }
      ],
      timestamp: serverTimestamp()
    });

    const imageRef = ref(storage, `tweets/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "tweets", docRef.id), {
          image: downloadURL,
        });
      });
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

  const addImageToPost = async (e) => {
    if (e.target.files[0]) {
      const image = await resizeFile(e.target.files[0]);
      setSelectedFile(image);
    }
  };

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

            {selectedFile && (
              <div className="relative">
                <div
                  className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] 
                bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                  onClick={() => setSelectedFile(null)}
                >
                  <XIcon className="text-white h-5" />
                </div>
                <img
                  src={selectedFile}
                  alt=""
                  className="rounded-2xl max-h-80 object-contain"
                />
              </div>
            )}
          </div>
          {!loading && (
            <div className="flex items-center justify-between pt-2.5">
              <div className="flex items-center">
                <div
                  className="icon"
                  onClick={() => filePickerRef.current.click()}
                >
                  <PhotographIcon className="text-[#1d9bf0] h-[22px] mr-2" />
                  <input
                    type="file"
                    ref={filePickerRef}
                    hidden
                    onChange={addImageToPost}
                  />
                </div>

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
