import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const { isDarkMode } = useTheme()
  const [expanded, setExpanded] = useState(true)

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col border-r shadow-sm">
        <div className="p-4 pb-2 mb-5 text-center">
          <Link to="/mentor/">
            <h1 className=" text-[30px] font-bold animate-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              {
                expanded ? "Amile" : "A"
              }
            </h1>
          </Link>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-900' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 '}  float-end `}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={onClick}
      className={`
                relative flex items-center py-2 px-3 my-1
                font-medium rounded-md cursor-pointer
                transition-colors group
                ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
        }
            `}
      
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
          }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
            }`}
        />
      )}
      {!expanded && (
        <div
          className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-indigo-100 text-indigo-800 text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
