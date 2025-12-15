'use client';

import type { MessageType, UserType } from '../types';

type PropTypes = {
  message: MessageType;
  user: UserType;
};

export default function UserMessage({ message, user }: PropTypes) {
  return (
    <div className="self-end flex items-center gap-2 ">
      <p className="bg-blue-600 px-4 py-2 rounded-md text-white ">
        {message.message}
      </p>
      <div className="min-w-8 min-h-8  max-w-8 max-h-8 rounded-full bg-linear-to-tr overflow-hidden from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
        {user?.image ? (
          <img
            src={user.image}
            alt={`image of ${user.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          user?.name.slice(0, 1)
        )}
      </div>
    </div>
  );
}
