import { useNavigate, useSearchParams } from 'react-router';
import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';
import { useEffect } from 'react';
import { useAuth } from '../store/useAuth';
import { useConversation } from '../store/useConversation';
import Modal from '../components/Modal';
import { useModel } from '../store/useModel';
import { CiChat1 } from 'react-icons/ci';
import { getConversation, getFriendById } from '../_lib/helpers';
import type { UserType } from '../types';
import { useMediaQuery } from 'usehooks-ts';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get('conversation');

  const { user } = useAuth((state) => state);

  const isMedium = useMediaQuery('(min-width: 640px)');

  const { setSelectedFriend } = useConversation((state) => state);
  const { isOpen } = useModel((state) => state);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user) {
        setSelectedFriend(null);
        navigate('/login');
      }
    },
    [user, navigate, setSelectedFriend]
  );

  useEffect(
    function () {
      async function synchronizeSelectedFriend() {
        if (!conversationId) return;
        const conversation = await getConversation(conversationId);
        const friendId = conversation?.participants?.filter(
          (participantId) => participantId !== user?.id
        );
        if (!conversation || !friendId) return;

        const friend = await getFriendById(friendId);

        setSelectedFriend(friend);
      }

      synchronizeSelectedFriend();
    },
    [conversationId, setSelectedFriend, user?.id]
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {isMedium ? (
        <>
          {user && <Sidebar />}

          {user && conversationId && <ChatBox key={conversationId} />}
          {user && !conversationId && (
            <div className="hidden sm:flex flex-1 flex-col items-center pt-40 col-span-full bg-neutral-100 h-full text-center">
              <CiChat1 className="text-6xl font-semibold mb-4" />
              <h1 className="text-3xl mb-8">Welcome to Chat App</h1>
              <p>Feel free to start conversation with anyone at anytime!</p>
            </div>
          )}
        </>
      ) : (
        <>
          {user && !conversationId && (
            <div className="w-full">
              <Sidebar />
            </div>
          )}
          {user && conversationId && <ChatBox key={conversationId} />}
        </>
      )}

      {isOpen && <Modal />}
    </div>
  );
}
