import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaRobot } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { TypeAnimation } from "react-type-animation";
import Cookies from 'js-cookie'
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { isDarkMode } = useTheme();
  const userName = Cookies.get('user')
  const suggestedPrompts = [
    "who developed amile ?",
    "How does AMILE personalize the interview experience?",
    "how can i apply for jobs?",
    "Does AMILE support text, voice, and video interactions?",
  ];

  const sendMessage = async (text) => {
    if (text.trim() === "") return;

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://127.0.0.1:5050/chat", {
        question: text,
      });
      const botMessage = { sender: "bot", text: response.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      } w-full`}
    >
      <main className="p-8 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
        >
 <TypeAnimation
            sequence={[`Hello, ${userName}`]}
            wrapper="span"
            speed={50}
            repeat={0}
          />        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl mt-2"
        >
          How can I help you today?
        </motion.p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestedPrompts.map((prompt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
              } rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300`}
              onClick={() => sendMessage(prompt)}
            >
              <p className="text-sm">{prompt}</p>
            </motion.div>
          ))}
        </div>

        <div
          className={`mt-8 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          } rounded-lg shadow-lg h-[calc(100vh-500px)] overflow-y-auto no-scrollbar p-4`}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div className={`flex items-start space-x-2 max-w-[70%]`}>
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <FaRobot />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : ` ${
                            isDarkMode
                              ? "bg-gray-900 text-white"
                              : "bg-[#fef6f6] text-black"
                          }`
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <FaUser />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-500 dark:text-gray-400 flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <FaRobot />
              </div>
              <span>Amile is typing...</span>
            </motion.div>
          )}
        </div>

        <footer className="my-7 flex items-center justify-center">
          <div
            className={`${
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            } rounded-lg shadow-lg w-full max-w-4xl p-4 flex items-center`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Enter a prompt here"
              className="p-3 w-full bg-gray-100 dark:bg-gray-700 dark:text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <button
              onClick={() => sendMessage(input)}
              className="ml-2 bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Chatbot;
