'use client';
import { IoSend } from 'react-icons/io5';
import { useConversation } from '../store/useConversation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMessages, updateConversation } from '../_lib/helpers';
import { Link, useSearchParams } from 'react-router';
import FriendMessage from './FriendMessage';
import UserMessage from './UserMessage';
import { useAuth } from '../store/useAuth';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { socket } from '../socket';
import type { MessagesType, MessageType } from '../types';
import { IoIosArrowBack } from 'react-icons/io';

export default function ChatBox() {
  const [clientMessage, setClientMessage] = useState('');
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get('conversation');

  const { user } = useAuth((state) => state);
  const { selectedFriend } = useConversation((state) => state);
  console.log('selectedFriend', selectedFriend);

  const bottomRef = useRef(null);

  const {
    data: messages,
    isPending,
    error,
  } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => await getMessages(conversationId || ''),
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    socket.emit('message', {
      message: clientMessage,
      senderId: user?.id,
      conversationId,
    });

    setClientMessage('');

    queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
    await updateConversation(conversationId);
    queryClient.invalidateQueries({ queryKey: ['conversations'] });
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages]);

  useEffect(
    function () {
      function handleMessages() {
        queryClient.invalidateQueries({
          queryKey: ['messages', conversationId],
        });
      }

      socket.on('messages', handleMessages);

      return () => {
        socket.off('messages', handleMessages);
      };
    },
    [queryClient, conversationId]
  );

  if (error) return <p>something went wrong</p>;

  if (isPending) return <p>loading...</p>;

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="px-4 py-6 flex-1 h-screen">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-semibold">
            <IoIosArrowBack />
          </Link>
          <div className="w-12 h-12 rounded-full bg-linear-to-tr overflow-hidden from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
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
          <div className="flex-1">
            <h3>{selectedFriend?.name}</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 h-full overflow-y-scroll px-4 py-6">
        {messages.map((message: MessageType) =>
          message.senderId === user?.id ? (
            <UserMessage key={message._id} message={message} user={user} />
          ) : (
            <FriendMessage key={message._id} message={message} />
          )
        )}
        <div ref={bottomRef} />
      </div>
      <form className="bg-sky-300 px-6 py-3 flex gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={clientMessage}
          onChange={(e) => setClientMessage(e.target.value)}
          placeholder="Write new message.."
          className="bg-white border-0 outline-0 rounded-full px-4 py-2 flex-1"
        />
        <button
          className="cursor-pointer text-2xl text-white bg-sky-700 px-2 py-1 rounded-full text-center"
          type="submit"
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
}
