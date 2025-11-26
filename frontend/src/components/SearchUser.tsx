import { IoIosClose } from 'react-icons/io';
import { useSearch } from '../store/useSearch';

export default function SearchUser() {
  const { searchValue, setSearchValue } = useSearch((state) => state);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }
  function handleDelete() {
    setSearchValue('');
  }

  return (
    <span className="relative">
      <input
        value={searchValue}
        onChange={handleChange}
        type="text"
        className="bg-white w-full px-4 py-2 rounded-full text-gray-800 border border-gray-300 outline-0"
        placeholder="Search users to chat by their name"
      />
      {searchValue && (
        <IoIosClose
          className="absolute top-1/2 -translate-y-1/2 right-1 text-3xl text-gray-700 font-semibold"
          onClick={handleDelete}
        />
      )}
    </span>
  );
}
