import { IoSearch } from "react-icons/io5";

const SearchBox=()=>
{
      return(
        <div className="flex items-center justify-between">
            <IoSearch className="mr-2"/> 
            <input type="text" placeholder="search here..."/>
        </div>
      )

}
export default SearchBox;