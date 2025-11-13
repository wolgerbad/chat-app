'use client';

import { useNavigate, useSearchParams } from 'react-router';
import { useConversation } from '../store/useConversation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMessages } from '../_lib/helpers';
import { format } from 'date-fns';
import { useEffect } from 'react';

export default function UsersList({ friend, conversationId }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { setSelectedFriend } = useConversation((state) => state);

  function handleSelect() {
    setSelectedFriend(friend);
    navigate(`?conversation=${conversationId}`);
    queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
  }

  const { data: messages, isPending } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => await getMessages(conversationId),
  });

  if (isPending) return;

  // console.log(`messages for ${conversationId}`, messages);

  const lastMessage = messages?.at(-1);
  const lastMessageHour = format(lastMessage?.updatedAt, 'H:mmaa');

  console.log('time,', lastMessageHour);

  return (
    <div
      className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 py-2 rounded-md transition-all duration-200"
      onClick={handleSelect}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
        {friend.name.slice(0, 1)}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{friend.name}</h3>
        <p className="font-medium text-gray-700 text-sm">
          {lastMessage.message}
        </p>
      </div>
      <span className="font-medium text-sm text-blue-600 self-start">
        {lastMessageHour}
      </span>
    </div>
  );
}
