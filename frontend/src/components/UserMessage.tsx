'use client';

export default function UserMessage({ message, user }) {
  return (
    <div className="self-end flex items-center gap-2">
      <p className="bg-blue-600 px-4 py-2 rounded-md text-white">
        {message.message}
      </p>
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
        {user.name.slice(0, 1)}
      </div>
    </div>
  );
}
