'use client';

import { Link, useNavigate } from 'react-router';
import { useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../store/useAuth';
import { handleSignUp } from '../_lib/helpers';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, setUser } = useAuth((state) => state);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function onSubmit(data) {
    setError('');
    const result = await handleSignUp(data);
    if (result.error) return setError(result.error);
    setUser(result);
  }

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
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block">Name:</label>
          <input
            {...register('name', {
              required: 'Invalid name',
            })}
            name="name"
            type="text"
            className="border-2 border-gray-900 w-full px-2 py-0.5 text-black"
          />
          {errors.name && (
            <p className="text-red-800 text-sm w-80">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            {...register('email')}
            name="email"
            type="email"
            className="border-2 border-gray-900 w-full px-2 py-0.5 text-black"
          />
          {errors.email && (
            <p className="text-red-800 text-sm w-80">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block">Password</label>
          <input
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            name="password"
            type="password"
            className="border-2 border-gray-900 w-full px-2 py-0.5 text-black"
          />
          {errors.password && (
            <p className="text-red-800 text-sm w-80">
              {errors.password.message}
            </p>
          )}
        </div>
        {error && <p className="text-red-800 text-sm w-80">{error}</p>}
        <div className="self-end mb-4">
          <SignUpButton />
        </div>
      </form>
      <div className="flex justify-between">
        Already have an account?{' '}
        <Link to="/login" className="underline decoration-blue-600">
          Log In!
        </Link>
      </div>
    </div>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`${
        pending ? 'bg-gray-200 cursor-not-allowed' : ''
      } border-2 border-fgPrimary px-3 py-1`}
    >
      {pending ? 'Signing up..' : 'Sign Up'}
    </button>
  );
}
