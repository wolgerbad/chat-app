import { useState } from 'react';
import { useAuth } from '../store/useAuth';
import { updateUsername } from '../_lib/helpers';
import { useModel } from '../store/useModel';

export default function Modal() {
  const { user, setUser } = useAuth((state) => state);
  const { setIsOpen } = useModel((state) => state);

  const [clientName, setClientName] = useState(() => user?.name);

  async function handleSave() {
    if (clientName === user?.name) return;

    const updatedUser = await updateUsername(user?.id, clientName);
    const { _id: id, name, email } = updatedUser;
    setUser({ id, name, email });
    setIsOpen(false);
  }

  return (
    <div className="fixed inset-0 backdrop-blur-xs backdrop-brightness-50">
      <div className="flex flex-col w-[80%] sm:w-[70%] md:w-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black-500 bg-white rounded-md">
        <div className="flex flex-col items-center my-4">
          <div className="w-16 h-16 rounded-full bg-linear-to-tr from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
            {user?.name.slice(0, 1)}
          </div>
          <p className="text-md font-medium mt-1">Edit profile</p>
        </div>
        <div className="px-4 flex-1 mb-8">
          <div className="items-center gap-2 mb-2">
            <label className="block">Name</label>
            <input
              type="text"
              className="flex-1 border outline-none px-2 py-1 w-full"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div className="gap-2 items-center">
            <label className="block">Email</label>
            <input
              type="text"
              className="flex-1 border outline-none px-2 py-1 bg-gray-400 cursor-not-allowed w-full"
              value={user?.email}
              readOnly
            />
          </div>
        </div>
        <div className="self-end p-1 text-white font-semibold">
          <button
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md mr-1 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md cursor-pointer"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
