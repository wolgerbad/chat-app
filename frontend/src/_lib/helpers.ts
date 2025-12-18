import type { UserType } from '../types';

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
  } catch (error: any) {
    return { error: error?.message };
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
  console.log('getConversations:', data);

  return data;
}

export async function getConversation(conversationId: string | null) {
  const res = await fetch(
    `http://localhost:4000/conversations/conversation/${conversationId}`
  );
  const data = await res.json();

  console.log('getConversation:', data);

  return data;
}

export async function getMessages(conversationId: string) {
  const res = await fetch(`http://localhost:4000/messages/${conversationId}`);
  const data = await res.json();

  return data;
}

export async function updateUser(id: string | undefined, field: object) {
  const res = await fetch(`http://localhost:4000/users/${id}`, {
    body: JSON.stringify(field),
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
  const users = searchedUsers.map((user: UserType) => ({
    ...user,
    id: searchedUsers._id,
  }));

  const filteredUsers = users.filter((user: UserType) => user.id !== userId);

  return filteredUsers;
}

export async function handleNewFriend(friendId: string, userId: string | null) {
  const participants = [friendId, userId];

  const res = await fetch('http://localhost:4000/conversations', {
    body: JSON.stringify({ participants }),
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
  });

  const newConversation = res.json();
  return newConversation;
}

export async function handleImageUpdate(e: any, user: UserType | null) {
  const formData = new FormData();
  formData.append('test', e.target.files[0]);
  const res = await fetch(`http://localhost:4000/upload/${user?.id}`, {
    method: 'POST',
    body: formData,
  });

  const data = res.json();
  return data;
}

export async function getFriendById(friendId: string | null) {
  const res = await fetch(`http://localhost:4000/users/${friendId}`);
  const friend = await res.json();
  return friend;
}

export async function updateConversation(conversationId: string | null) {
  console.log('conversation ID:', conversationId);
  const res = await fetch('http://localhost:4000/conversations/update', {
    method: 'PUT',
    body: JSON.stringify({ conversationId }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const result = await res.json();

  console.log('updatedConversation:', result);

  return result;
}
