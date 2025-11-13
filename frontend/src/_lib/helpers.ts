export async function handleLogin({ email, password }) {
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

export async function handleSignUp({ name, email, password }) {
  try {
    const res = await fetch('http://localhost:4000/api/auth/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Invalid credentials');

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

export async function getConversations(userId) {
  const res = await fetch(`http://localhost:4000/conversations/${userId}`);
  const data = await res.json();

  return data;
}

export async function getMessages(conversationId) {
  const res = await fetch(`http://localhost:4000/messages/${conversationId}`);
  const data = await res.json();

  return data;
}

export async function updateUsername(id, name) {
  console.log('id,name', id, name);
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
