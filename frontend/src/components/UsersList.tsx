'use client';

import { useNavigate } from 'react-router';
import { useConversation } from '../store/useConversation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getFriendById, getMessages } from '../_lib/helpers';
import { format } from 'date-fns';
import type { ConversationType } from '../types';
import { useAuth } from '../store/useAuth';

type PropTypes = {
  conversation: ConversationType;
};

export default function UsersList({ conversation }: PropTypes) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const user = useAuth((state) => state.user);
  const { setSelectedFriend } = useConversation((state) => state);

  const friendId = conversation.participants.filter(
    (participantId) => participantId !== user?.id
  )[0];

  const { data: friend, isPending: isFriendLoading } = useQuery({
    queryKey: ['friend', friendId],
    queryFn: async () => await getFriendById(friendId),
  });

  function handleSelect() {
    setSelectedFriend(friend);
    navigate(`?conversation=${conversation._id}`);
    queryClient.invalidateQueries({ queryKey: ['messages', conversation._id] });
  }

  const { data: messages, isPending } = useQuery({
    queryKey: ['messages', conversation._id],
    queryFn: async () => await getMessages(conversation._id),
  });

  if (isPending || isFriendLoading) return <p>Loading...</p>;

  const lastMessage = (messages.length && messages?.at(-1)) || '';
  const lastMessageHour =
    (messages.length && format(lastMessage?.updatedAt, 'H:mmaa')) || '';

  return (
    <div
      className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 py-2 rounded-md transition-all duration-200"
      onClick={handleSelect}
    >
      <div className="w-12 h-12 rounded-full bg-linear-to-tr overflow-hidden from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
        {friend?.image ? (
          <img
            src={friend.image}
            alt={`image of ${friend.image}`}
            className="object-center w-full h-full"
          />
        ) : (
          friend?.name?.slice(0, 1)
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{friend?.name}</h3>
        <p className="font-medium text-gray-700 text-sm">
          {lastMessage ? `${lastMessage.message.slice(0, 20)}` : ''}
        </p>
      </div>
      <span className="font-medium text-sm text-blue-600 self-start">
        {lastMessageHour}
      </span>
    </div>
  );
}
