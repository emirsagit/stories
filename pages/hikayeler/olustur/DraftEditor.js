import React from 'react'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./create-stories.module.css";
import dynamic from 'next/dynamic';

export default function DraftEditor({ content, onEditorStateChange }) {
  return (
    <Editor
      toolbar={{
        options: ['inline', 'blockType', 'list', 'emoji', 'history'],
        inline: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['bold', 'italic', 'underline'],
        },
        blockType: {
          inDropdown: true,
          options: ['Normal', 'H2', 'H3', 'H4', 'Blockquote'],
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
        },
        list: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['unordered', 'ordered'],
        },
        emoji: {
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          emojis: [
            '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
            '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
            '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
            '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
            '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
            '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
            '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
            '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
            '✅', '❎', '💯',
          ],
        },
        history: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['undo', 'redo'],
        },
      }}
      editorState={content}
      toolbarClassName={styles.editorWrapper}
      wrapperClassName={styles.editorWrapper}
      editorClassName={styles.editorContent}
      onEditorStateChange={onEditorStateChange}
    />
  )
}
