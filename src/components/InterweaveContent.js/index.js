import React from 'react'
import draftToHtml from 'draftjs-to-html';
import { Interweave } from "interweave";

export default function InterweaveContent({ content, sliceSize = null }) {

  const convertDraftToHtml = (content) => {
    let markup = draftToHtml(content);
    sliceSize && (markup = markup.slice(0, sliceSize) + "...");
    return markup;
  }

  return (
    <Interweave tagName="div" content={convertDraftToHtml(content)} />
  )
}
