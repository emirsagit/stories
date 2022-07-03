import React from 'react'
import Button from '../Button'
import {
  DocumentAddIcon,
} from "@heroicons/react/outline";

export default function NewMessage({ handleClick }) {
  return (
    <div className='text-white relative px-4 tracking-wide flex items-left gap-2 justify-center lg:justify-start min-h-full flex-col'>
      <h2 className='text-white'>Gelen kutuna hoş geldin!</h2>
      <p className='text-gray-300'>Takip ettiğin kişilerle özel sohbet edebilirsin...</p>
      <Button style={{ "alignSelf": "flex-start" }} handleClick={handleClick}>Mesaj Yaz</Button>
      <button className='fixed lg:absolute bottom-0 right-0 mb-20 mr-4 bg-primary w-16 h-16 rounded-full' onClick={handleClick}>
        <DocumentAddIcon className="text-white h-10 w-full mx-auto" />
      </button>
    </div>
  )
}
