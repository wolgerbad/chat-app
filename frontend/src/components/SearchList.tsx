import { useQueryClient } from '@tanstack/react-query';
import { getConversations, handleNewFriend } from '../_lib/helpers';
import { useAuth } from '../store/useAuth';
import { useConversation } from '../store/useConversation';
import { useNavigate } from 'react-router';
import type { ConversationType, UserType } from '../types';

type PropTypes = {
  friend: UserType;
};

export default function SearchList({ friend }: PropTypes) {
  const { user } = useAuth((state) => state);
  const { setSelectedFriend } = useConversation((state) => state);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function handleSelect() {
    setSelectedFriend(friend);

    const conversations = await getConversations(user?.id || '');

    const conversationExists = conversations.find(
      (conversation: ConversationType) =>
        conversation.participants.some(
          (participantId) => participantId === friend.id
        )
    );

    if (conversationExists)
      return navigate(`?conversation=${conversationExists._id}`);

    const conversation = await handleNewFriend(friend.id, user.id);

    navigate(`?conversation=${conversation._id}`);
    queryClient.invalidateQueries({ queryKey: ['conversations'] });
  }

  return (
    <div
      className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 py-2 rounded-md transition-all duration-200"
      onClick={handleSelect}
    >
      <div className="w-12 h-12 rounded-full bg-linear-to-tr overflow-hidden from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
        {friend?.image ? (
          <img
            src={friend.image}
            alt={`image of ${friend.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          friend.name.slice(0, 1)
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{friend.name}</h3>
        {/* <p className="font-medium text-gray-700 text-sm">{friend.id}</p> */}
      </div>
      <span className="font-medium text-sm text-blue-600 self-start"></span>
    </div>
  );
}
