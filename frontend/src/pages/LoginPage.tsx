import { Link, useNavigate } from 'react-router';

import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useMutation } from '@tanstack/react-query';
import { handleLogin } from '../_lib/helpers';
import { useAuth } from '../store/useAuth';

export default function LoginPage() {
  const { user, setUser } = useAuth((state) => state);

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {
    data,
    isPending,
    mutate: onLogin,
    error: loginError,
  } = useMutation({
    mutationFn: async () => await handleLogin({ email, password }),
    onSuccess: (data) => {
      setError('');
      setUser(data);
    },
    onError: (error) => setError(error.message),
  });

  useEffect(
    function () {
      if (user) navigate('/');
    },
    [user, navigate]
  );

  return (
    <div className="m-10 max-w-72 text-fgPrimary">
      <h1 className="bg-neutral-200 p-2 text-gray-700 rounded-lg mb-4">
        ⚠️ This is a beta version. Some functions may not work as expected.
      </h1>
      <form
        className="flex flex-col gap-2"
        action={async () => await onLogin({ email, password })}
      >
        <div>
          <label className="block">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            required
            className="border-2 border-fgPrimary w-full px-2 py-0.5 text-black"
          />
        </div>
        <div>
          <label className="block">Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="border-2 border-gray-900 w-full px-2 py-0.5 text-black"
          />
        </div>
        {error && <p className="text-red-800 text-sm max-w-80">{error}</p>}
        <div className="self-end mb-8">
          <LoginButton />
        </div>
      </form>
      <div className="flex justify-between">
        Have no account?{' '}
        <Link to="/signup" className="underline decoration-blue-500">
          Sign Up!
        </Link>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${
        pending ? 'bg-gray-200 cursor-not-allowed text-black' : ''
      } border-2 border-fgPrimary px-4 py-1`}
    >
      {pending ? 'Logging in..' : 'Log in'}
    </button>
  );
}
