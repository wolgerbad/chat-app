import type { ConversationType, UserType } from '../types';

export async function handleLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();

  if (result.error) throw new Error(result.error);

  return result;
}

export async function handleSignUp({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const res = await fetch('http://localhost:4000/api/auth/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    return { error: error.message };
  }
}

export async function handleLogout() {
  try {
    const res = await fetch('http://localhost:4000/api/auth/logout', {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Something went wrong');
    return { message: 'success' };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getConversations(userId: string | undefined) {
  const res = await fetch(`http://localhost:4000/conversations/${userId}`);
  const data = await res.json();

  return data;
}

export async function getConversation(conversationId: string | null) {
  const res = await fetch(
    `http://localhost:4000/conversations/conversation/${conversationId}`
  );
  const data = await res.json();

  return data;
}

export async function getMessages(conversationId: string) {
  const res = await fetch(`http://localhost:4000/messages/${conversationId}`);
  const data = await res.json();

  return data;
}

export async function updateUsername(
  id: string | undefined,
  name: string | undefined
) {
  const res = await fetch(`http://localhost:4000/users/${id}`, {
    body: JSON.stringify({ name }),
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
  });
  const result = await res.json();

  return result;
}

export async function getSearchedUsers(
  val: string,
  userId: string | undefined
) {
  if (val.length < 1) return '';
  const res = await fetch(`http://localhost:4000/users/search/${val}`);
  const searchedUsers = await res.json();
  const users = searchedUsers.map((user) => ({
    ...user,
    id: searchedUsers._id,
  }));

  const filteredUsers = users.filter((user) => user._id !== userId);

  return filteredUsers;
}

export async function handleNewFriend(friend: UserType, user: UserType | null) {
  const participants = [friend, user];

  const userConversations = await getConversations(user?.id);
  const isConversationExists = userConversations.filter(
    (conversation: ConversationType) =>
      conversation.participants.some((p) => p.id == friend.id)
  );
  if (isConversationExists.length) return;

  const res = await fetch('http://localhost:4000/conversations', {
    body: JSON.stringify({ participants }),
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
  });

  const newConversation = res.json();
  return newConversation;
}
