import React from 'react'
import Button from '../Button'
import {
  ArrowNarrowLeftIcon,
  MailOpenIcon
} from "@heroicons/react/outline";
import useFollow from '../../hooks/useFollow';

export default function SelectUser({ handleClick }) {
  const { authUserFollows } = useFollow();

  console.log(authUserFollows);

  const selectUser=(user) => {
    handleClick(user);
  }

  return (
    <div className='text-white relative px-4 tracking-wide flex items-left gap-2 justify-start min-h-full flex-col'>
      <div className='flex gap-3 text-white items-center'>
        <ArrowNarrowLeftIcon className="text-white h-7" onClick={() => handleClick()} />
        <p>Direkt Mesaj</p>
      </div>
      {authUserFollows.followers.length > 0 && (
        <>
          <p className='text-xs text-gray-200 tracking-wider'>Takipçileriniz:</p>
          <div className='flex flex-col mb-3'>
            {authUserFollows.followers.map((user) => (
              <button key={user.uid} className='flex items-center gap-3 py-3 cursor-pointer bg-gray-800 p-2 rounded-lg hover:bg-gray-700 ease-out duration-300 mb-2 border-b-2 border-b-black' onClick={() => selectUser(user)}>
                <img src={user.photoURL} className='h-10 w-10 rounded-full' />
                <p className='text-white'>{user.displayName}</p>
                <MailOpenIcon className="text-gray-300 h-6 ml-auto" onClick={() => handleClick()} />
              </button>
            ))}
          </div>
        </>
      )}
      {authUserFollows.follows.length > 0 && (
        <>
          <p className='text-xs text-gray-200 tracking-wider	'>Takip ettikleriniz:</p>
          <div className='flex flex-col'>
            {authUserFollows.follows.map((user) => (
              <button key={user.uid} className='flex items-center gap-3 py-3 cursor-pointer bg-gray-800 p-2 rounded-lg hover:bg-gray-700 ease-out duration-300 mb-2 border-b-2 border-b-black' onClick={() => selectUser(user)}>
                <img src={user.photoURL} className='h-10 w-10 rounded-full' />
                <p className='text-white'>{user.displayName}</p>
                <MailOpenIcon className="text-white h-7" onClick={() => handleClick()} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
