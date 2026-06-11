import { FaSearch } from "react-icons/fa";

export default function SearchInput({
  placeholder,
}) {
  return (
    <div className="relative w-full md:w-80">
      <FaSearch
        className="
          absolute left-3 top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          pl-10
          pr-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
}