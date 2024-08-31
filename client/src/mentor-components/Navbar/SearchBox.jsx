import { IoSearch } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";

const SearchBox = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex items-center bg-${isDarkMode ? 'gray-800' : 'gray-200'} p-2 px-4 w-80 rounded-xl`}>
      <IoSearch className="mr-2" />
      <input 
        type="text" 
        placeholder="Search here..." 
        className={`bg-transparent placeholder-${isDarkMode ? 'text-gray-400' : 'text-black'}`}
      />
    </div>
  );
};

export default SearchBox;
