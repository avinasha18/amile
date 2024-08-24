import React from 'react';

function ChatList({ chats, setActiveChat, activeChat }) {
  return (
    <div className="w-1/3 bg-[#000] border-r border-gray-700">
      <div className="p-4 border-b border-gray-600">
        <h2 className="text-lg font-semibold text-blue-600">Active Chats ({chats.length})</h2>
        <p className="text-sm text-gray-500">Chats will be automatically removed after 90 days from the list</p>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-70px)]">
        {chats.map(chat => (
          <div 
            key={chat.id}
            className={`flex items-start p-4 border-b border-gray-800 cursor-pointer ${activeChat && activeChat.id === chat.id ? 'bg-[#151515]' : ''}`}
            onClick={() => setActiveChat(chat)}
          >
            <div className="flex-shrink-0 w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold">
              {chat.name[0]}
            </div>
            <div className="ml-3 flex-grow">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-semibold">{chat.name} • {chat.company}</h3>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.message}</p>
            </div>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{chat.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
