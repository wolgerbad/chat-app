'use client';

import { useConversation } from '../store/useConversation';
import type { MessageType } from '../types';

type PropTypes = {
  message: MessageType;
};

export default function FriendMessage({ message }: PropTypes) {
  const { selectedFriend } = useConversation((state) => state);

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full overflow-hidden bg-linear-to-tr from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
        {selectedFriend?.image ? (
          <img
            src={selectedFriend.image}
            alt={`image of ${selectedFriend.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          selectedFriend?.name.slice(0, 1)
        )}
      </div>
      <p className="bg-blue-400 px-4 py-2 rounded-md text-white">
        {message.message}
      </p>
    </div>
  );
}
