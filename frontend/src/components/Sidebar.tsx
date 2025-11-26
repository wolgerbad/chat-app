import { useFormStatus } from 'react-dom';
import { MdLogout, MdOutlineEdit } from 'react-icons/md';
import {
  getConversations,
  getSearchedUsers,
  handleLogout,
} from '../_lib/helpers';
import { useAuth } from '../store/useAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import UsersList from './UsersList';
import { useNavigate } from 'react-router';
import { useModel } from '../store/useModel';
import SearchUser from './SearchUser';
import { useSearch } from '../store/useSearch';
import SearchList from './SearchList';
import { useEffect } from 'react';
import type { ConversationType, UserType } from '../types';

export type User = {
  id: string;
  email: string;
  name: string;
};

export default function Sidebar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setIsOpen } = useModel((state) => state);
  const { user, setUser } = useAuth((state) => state);
  const { searchValue } = useSearch((state) => state);

  const { data: conversations, isPending } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => await getConversations(user?.id),
  });

  const { data: searchedUsers } = useQuery({
    queryKey: ['searchedUsers'],
    staleTime: 0,
    queryFn: async () => await getSearchedUsers(searchValue, user?.id),
  });

  async function onLogout() {
    const result = await handleLogout();
    if (result.error) return;
    setUser(null);
    navigate('/login');
  }

  useEffect(
    function () {
      queryClient.invalidateQueries({ queryKey: ['searchedUsers'] });
    },
    [queryClient, searchValue]
  );

  if (isPending) return <p>Loading..</p>;

  const users =
    searchedUsers &&
    searchedUsers?.map(
      (user: { _id: string; name: string; email: string }) => ({
        id: user._id,
        name: user.name,
        email: user.email,
      })
    );

  return (
    <div className="flex flex-col bg-gray-200 h-screen px-6 py-6 md:min-w-100 overflow-y-scroll">
      <div className="flex gap-2 items-center pb-8 border-b-2 border-gray-600 mb-2">
        <div className="w-12 h-12 rounded-full bg-linear-to-tr from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
          {user?.name.slice(0, 1)}
        </div>
        <div className="flex-1">
          <h3 className="text-blue-600 font-semibold">{user?.name}</h3>
          <p className="text-sm">{user?.id}</p>
        </div>
        <button
          className="text-2xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <MdOutlineEdit />
        </button>
      </div>
      <SearchUser />
      <div className="flex-1 mt-8 flex flex-col gap-8">
        {!users ? (
          conversations?.map((conversation: ConversationType) => {
            const friend = conversation.participants.filter(
              (participant) => participant.id !== user?.id
            )[0];

            return (
              <UsersList
                key={conversation._id}
                friend={friend}
                conversationId={conversation._id}
              />
            );
          })
        ) : users.length ? (
          users.map((user: UserType) => (
            <SearchList key={user.id} friend={user} />
          ))
        ) : (
          <span className="text-gray-700 text-center">user not found</span>
        )}
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
