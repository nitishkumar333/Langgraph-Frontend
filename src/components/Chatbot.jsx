import { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, I am an AI assistant. How can I help you?", sender: 'bot' },
  ]);
  // console.log(messages)
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/chat-history/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arr = await response.json();
        const updated_arr = arr.messages.map(((ele)=>{
          return {
            id: ele.id,
            text: ele.content,
            sender: ele.type
          }
        }));
        if(updated_arr.length > 0){
          setMessages(updated_arr);
        }else{
          setMessages([
            { id: 1, text: "Hi, I am an AI assistant. How can I help you?", sender: 'bot' },
          ])
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchMessages();
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // setTimeout(() => {
    //   const botResponses = [
    //     "I understand your question about '" + inputValue + "'. Let me think...",
    //     "That's an interesting point about '" + inputValue + "'. Here's what I know...",
    //     "Thanks for asking about '" + inputValue + "'. Here's some information that might help...",
    //     "I've processed your query about '" + inputValue + "'. Here's my response..."
    //   ];
      
    //   const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
    //   const newBotMessage = {
    //     id: messages.length + 2,
    //     text: randomResponse,
    //     sender: 'bot'
    //   };

    //   setMessages(prev => [...prev, newBotMessage]);
    //   setIsTyping(false);
    // }, 1500);

    const response = await fetch("http://127.0.0.1:8000/chat-ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "query": inputValue }),
    });

    if (!response.ok) {
      throw new Error("Failed to test bot");
    }

    const data = await response.json();
    const newBotMessage = {
      id: messages.length + 2,
      text: data["response"],
      sender: 'bot'
    };
    setMessages(prev => [...prev, newBotMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="chatbot-container bg-white rounded-xl w-100 h-[90vh] flex flex-col overflow-hidden shadow-xl">
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center mr-2">
                <i className="fas fa-robot text-white"></i>
              </div>
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-indigo-200 focus:outline-none"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 message-animation ${message.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none shadow'}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="bg-white text-gray-800 rounded-lg rounded-bl-none p-3 shadow message-animation">
                  <div className="typing-indicator flex space-x-1">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                className={`bg-indigo-600 text-white px-4 py-2 rounded-r-lg ${inputValue.trim() === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI assistant may produce inaccurate information.
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <i className="fas fa-comment-dots text-2xl"></i>
        </button>
      )}
    </div>
  );
};

export default Chatbot;