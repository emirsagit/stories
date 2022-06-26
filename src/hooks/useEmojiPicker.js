import { useState } from 'react';
import dynamic from "next/dynamic";

export default function useEmojiPicker() {

  const [showEmojis, setShowEmojis] = useState(false);

  const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

  const convertEmojiToString = (event, emojiObject) => {
    let sym = emojiObject.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    return String.fromCodePoint(...codesArray);
  };

  const handleEmojiClose = () => {
    setShowEmojis(false);
  }

  const handleEmojiShow = () => {
    setShowEmojis(true);
  }

  const EmojiPicker = ({ handleEmojiClick }) => (
    <>
      <div className='fixed inset-0'>
        <div className='absolute inset-0 opacity-5' onClick={handleEmojiClose}></div>
      </div>
      <div
        style={{
          position: "absolute",
          marginTop: "360px",
          marginLeft: 0,
        }}
      >
        <Picker onEmojiClick={handleEmojiClick} pickerStyle={{ width: '100%', maxWidth: "300px" }} />
      </div>
    </>
  )

  return { convertEmojiToString, handleEmojiClose, handleEmojiShow, showEmojis, EmojiPicker };
}
