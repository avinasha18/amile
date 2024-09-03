import React, { useState, useEffect } from "react";
import ChatList from "../../components/ChatList";
import ChatWindow from "../../components/ChatWindow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import socket from "../../hooks/socket.js"
function StartChat() {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const {_id:studentId }= useSelector((state) => state.auth.userData);
  const [page, setPage] = useState(1);
  const limit = 30;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          if (chat._id === data.chat._id) {
            return {
              ...chat,
              messages: [
                ...chat.messages,
                data.chat.messages[data.chat.messages.length - 1],
              ],
            };
          }
          return chat;
        });
  
        return updatedChats;
      });
  
      // Update the activeChat state if the message belongs to the current active chat
      if (activeChat && activeChat._id === data.chat._id) {
        setActiveChat((prevActiveChat) => ({
          ...prevActiveChat,
          messages: [
            ...prevActiveChat.messages,
            data.chat.messages[data.chat.messages.length - 1],
          ],
        }));
      }
    });
  
    socket.on("updateChats", (updatedChats) => {
      setChats(updatedChats);
  
      if (activeChat) {
        const updatedActiveChat = updatedChats.find(
          (chat) => chat._id === activeChat._id
        );
        if (updatedActiveChat) {
          setActiveChat(updatedActiveChat);
        }
      }
    });
  
    return () => {
      socket.off("receiveMessage");
      socket.off("updateChats");
    };
  }, [activeChat]);

  useEffect(() => {
    fetchChats(page);
  }, [page]);

  // Function to fetch chats with pagination
  const fetchChats = (pageNumber) => {
    socket.emit(
      "getChats",
      { message:{studentId}, page: pageNumber, limit },
      (response) => {
        if (response.success) {
          setChats(response.chats);
        } else {
          toast.error("Error fetching chats.");
        }
      }
    );
  };

  const loadMoreMessages = () => {
    const newPage = page + 1;
    setPage(newPage);
    socket.emit(
      "getChats",
      {
        message: {
          studentId: activeChat.studentId,
          ...(activeChat.companyId
            ? { companyId: activeChat.companyId?._id }
            : { mentorId: activeChat.mentorId?._id }),
        },
        page: newPage,
        limit,
      },
      (response) => {
        if (response.success) {
          setMessages((prevMessages) => [
            ...response.chat.messages,
            ...prevMessages,
          ]);
        } else {
          toast.error("Error loading more messages.");
        }
      }
    );
  };

  const sendMessage = (message) => {

    if (activeChat && message.trim()) {
      const newMessage = {
        studentId: activeChat.studentId._id,
        text: message,
        sender: activeChat.studentId._id,
        ...(activeChat.companyId
          ? { companyId: activeChat.companyId._id }
          : { mentorId: activeChat.mentorId._id }),
      };
      


      socket.emit("sendMessage", { message: newMessage }, (response) => {
        if (response.success) {
          setMessages((prevMessages) => [...prevMessages, response.message]);
          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat._id === response.chat._id ? response.chat : chat
            )
          );
          setActiveChat(response.chat);
        } else {
          toast.error("Error sending message.");
        }
      });
    }
  };

  return (
    <div
      className={`flex h-screen w-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <ToastContainer />
      {!activeChat || !isMobile ? (
        <div
          className={`flex-none h-full ${
            isMobile ? "w-full" : "w-2/6"
          } border-r`}
        >
          <ChatList
            chats={chats}
            setActiveChat={setActiveChat}
            activeChat={activeChat}
          />
        </div>
      ) : null}
      {(activeChat || !isMobile) && (
        <div className={`flex-grow h-full ${isMobile ? "w-full" : "w-4/6"}`}>
          <ChatWindow
            activeChat={activeChat}
            messages={messages}
            sendMessage={sendMessage}
            loadMoreMessages={loadMoreMessages}
            onBack={() => setActiveChat(null)}
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default StartChat;
