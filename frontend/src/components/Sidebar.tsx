import { useFormStatus } from 'react-dom';
import { MdLogout, MdOutlineEdit } from 'react-icons/md';
import { getConversations, handleLogout } from '../_lib/helpers';
import { useAuth } from '../store/useAuth';
import { useQuery } from '@tanstack/react-query';
import UsersList from './UsersList';
import { useNavigate } from 'react-router';
import { useModel } from '../store/useModel';

export type User = {
  id: string;
  email: string;
  name: string;
};

export default function Sidebar() {
  const navigate = useNavigate();
  const { setIsOpen } = useModel((state) => state);
  const { user, setUser } = useAuth((state) => state);

  const {
    data: conversations,
    isPending,
    error,
  } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => await getConversations(user.id),
  });

  async function onLogout() {
    const result = await handleLogout();
    if (result.error) return;
    setUser(null);
    navigate('/login');
  }

  if (isPending) return <p>Loading..</p>;

  return (
    <div className="flex flex-col col-start-1 col-span-1 h-screen bg-gray-200 px-6 py-6">
      <div className="flex gap-2 items-center pb-8 border-b-2 border-gray-600">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
          {user.name.slice(0, 1)}
        </div>
        <div className="flex-1">
          <h3 className="text-blue-600 font-semibold">{user.name}</h3>
          <p className="text-sm">{user.id}</p>
        </div>
        <button
          className="text-2xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <MdOutlineEdit />
        </button>
      </div>
      <div className="flex-1 mt-8 flex flex-col gap-8">
        {conversations.map((conversation) => {
          const friend = conversation.participants.filter(
            (participant) => participant.id !== user.id
          )[0];

          return (
            <UsersList
              key={conversation._id}
              friend={friend}
              conversationId={conversation._id}
            />
          );
        })}
      </div>
      <form className="self-end" action={onLogout}>
        <Button />
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`${
        pending ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-800'
      } text-white text-2xl px-2 py-1 rounded-full cursor-pointer`}
    >
      <MdLogout />
    </button>
  );
}
