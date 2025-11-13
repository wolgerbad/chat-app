import { useNavigate, useSearchParams } from 'react-router';
import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';
import { useEffect } from 'react';
import { useAuth } from '../store/useAuth';
import { useConversation } from '../store/useConversation';
import Modal from '../components/Modal';
import { useModel } from '../store/useModel';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get('conversation');

  const { user } = useAuth((state) => state);
  const { selectedFriend, setSelectedFriend } = useConversation(
    (state) => state
  );
  const { isOpen } = useModel((state) => state);
  const navigate = useNavigate();

  console.log('selectedFriend', selectedFriend);

  useEffect(
    function () {
      if (!user) {
        setSelectedFriend(null);
        navigate('/login');
      }
    },
    [user, navigate]
  );
  return (
    <div className="grid grid-cols-4">
      {user && <Sidebar />}
      {user && selectedFriend && <ChatBox key={conversationId} />}
      {isOpen && <Modal />}
    </div>
  );
}
