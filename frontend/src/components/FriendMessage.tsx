'use client';

import { useConversation } from '../store/useConversation';

export default function FriendMessage({ message }) {
  const { selectedFriend } = useConversation((state) => state);

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
        {selectedFriend.name.slice(0, 1)}
      </div>
      <p className="bg-blue-400 px-4 py-2 rounded-md text-white">
        {message.message}
      </p>
    </div>
  );
}
