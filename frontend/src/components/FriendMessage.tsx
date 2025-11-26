'use client';

import { useState } from 'react';
import { useConversation } from '../store/useConversation';
import type { MessageType } from '../types';

type PropTypes = {
  message: MessageType;
};

export default function FriendMessage({ message }: PropTypes) {
  // const [fileName, setFileName] = useState('');
  const { selectedFriend } = useConversation((state) => state);

  // async function handleSubmit(formData: FormData) {
  //   const res = await fetch('http://localhost:4000/upload', {
  //     method: 'POST',
  //     body: formData,
  //   });
  //   const x = await res.blob();
  //   console.log('sxxx', x);
  //   const url = URL.createObjectURL(x);
  //   setFileName(url);
  // }

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-linear-to-tr from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
        {selectedFriend?.name.slice(0, 1)}
      </div>
      <p className="bg-blue-400 px-4 py-2 rounded-md text-white">
        {message.message}
      </p>
    </div>
  );
}
