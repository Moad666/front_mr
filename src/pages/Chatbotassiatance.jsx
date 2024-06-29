import { Input, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { RiScrollToBottomFill } from "react-icons/ri";

export default function ChatbotAssistance() {
  const [text, setText] = useState("");
  const [activeChatId, setActiveChatId] = useState("1");
  const [chats, setChats] = useState([
    {
      id: "1",
      title: "How much the number of people",
      date: "2023-06-20",
      messages: [
        { sender: "user", content: "Hi, can you tell me what the number is?", date: "2023-06-20 10:00" },
        { sender: "chatbot", content: "Sure, what exactly do you need?", date: "2023-06-20 10:01" },
        { sender: "user", content: "I need the population of the city.", date: "2023-06-20 10:02" },
        { sender: "chatbot", content: "The population is 500,000.", date: "2023-06-20 10:03" },
        { sender: "user", content: "Hi, can you tell me what the number is?", date: "2023-06-20 10:00" },
        { sender: "chatbot", content: "Sure, what exactly do you need?", date: "2023-06-20 10:01" },
        { sender: "user", content: "I need the population of the city.", date: "2023-06-20 10:02" },
        { sender: "chatbot", content: "The population is 500,000.", date: "2023-06-20 10:03" },
        { sender: "user", content: "Hi, can you tell me what the number is?", date: "2023-06-20 10:00" },
        { sender: "chatbot", content: "Sure, what exactly do you need?", date: "2023-06-20 10:01" },
        { sender: "user", content: "I need the population of the city.", date: "2023-06-20 10:02" },
        { sender: "chatbot", content: "The population is 500,000.", date: "2023-06-20 10:03" },
        { sender: "user", content: "Hi, can you tell me what the number is?", date: "2023-06-20 10:00" },
        { sender: "chatbot", content: "Sure, what exactly do you need?", date: "2023-06-20 10:01" },
        { sender: "user", content: "I need the population of the city.", date: "2023-06-20 10:02" },
        { sender: "chatbot", content: "The population is 500,000.", date: "2023-06-20 10:03" },
      ]
    },
    {
      id: "2",
      title: "How much the number of items",
      date: "2023-06-21",
      messages: [
        { sender: "user", content: "Hi, can you tell me the number of items in stock?", date: "2023-06-21 14:00" },
        { sender: "chatbot", content: "We have 200 items in stock.", date: "2023-06-21 14:01" },
      ]
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [showScrollIcon, setShowScrollIcon] = useState(false);
  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const addNewChat = () => {
    const newChatId = (chats.length + 1).toString();
    const newChat = {
      id: newChatId,
      title: `New Chat ${newChatId}`,
      date: new Date().toISOString().split('T')[0],
      messages: []
    };
    setChats([...chats, newChat]);
    setActiveChatId(newChatId);
  };

  const handleSendMessage = async () => {
    if (text.trim() === "") return;

    const newMessage = {
      sender: "user",
      content: text,
      date: new Date().toISOString()
    };

    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === activeChatId) {
          const updatedChat = {
            ...chat,
            messages: [...chat.messages, newMessage]
          };

          // Update the chat title if it's the first message
          if (chat.messages.length === 0) {
            updatedChat.title = text;
          }

          return updatedChat;
        }
        return chat;
      });
    });

    setText("");
    scrollToBottom();

    setLoading(true); // Start loading

    // Send the message to the server
    try {
      const response = await fetch("http://127.0.0.1:8000/api/generate-text/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: text })
      });

      const data = await response.json();

      // Add the chatbot's response to the chat
      const chatbotMessage = {
        sender: "chatbot",
        content: data.response, // Assuming the server returns a JSON object with a 'response' field
        date: new Date().toISOString()
      };

      setChats(prevChats => {
        return prevChats.map(chat => {
          if (chat.id === activeChatId) {
            return {
              ...chat,
              messages: [...chat.messages, chatbotMessage]
            };
          }
          return chat;
        });
      });

      scrollToBottom();
    } catch (error) {
      console.error("Error sending message to server:", error);
    } finally {
      setLoading(false); // Stop loading
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container) {
      const isBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
      setShowScrollIcon(!isBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChatId]);

  const activeChat = chats.find(chat => chat.id === activeChatId)?.messages || [];

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", margin: "0px", borderRadius: "20px", gap: "5px" }}>
      <div style={{ width: "20%", height: "100%", backgroundColor: "white" }}>
        <div
          style={{ padding: "0.5rem", display: "flex", alignItems: "center", cursor: "pointer" }}
          className="changecolorchat"
          onClick={addNewChat}
        >
          <img src={"/chatbotimage.png"} style={{ borderRadius: "50px", width: "50px", height: "50px" }} alt="Chatbot" />
          New Chat
        </div>
        <hr/>
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)}
            style={{ padding: "0.5rem", cursor: "pointer" }}
            className="changecolorchat"
          >
            {chat.title}
          </div>
        ))}
      </div>

      <div style={{ width: "80%", height: "100%", backgroundColor: "#f5f6f6", color: "black", display: "flex", flexDirection: "column" }}>
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          style={{ height: "90%", width: "100%", flex: 1, padding: "10px", overflowY: "scroll", display: "flex", flexDirection: "column" }}
        >
          {activeChat.map((message, index) => (
            <div
              key={index}
              style={{
                maxWidth: "80%",
                padding: "1rem",
                backgroundColor: message.sender === "chatbot" ? "" : "#e5e5e5",
                borderRadius: "30px",
                margin: "10px",
                display: "flex",
                alignItems: "center",
                alignSelf: message.sender === "chatbot" ? "flex-start" : "flex-end"
              }}
            >
              <img src={"/chatbotimage.png"} style={{ borderRadius: "50px", width: "50px", height: "50px" }} alt="Chatbot" />
              <div>
                <div>{message.content}</div>
                <div style={{ fontSize: "0.8rem", color: "gray" }}>{message.date}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px" }}>
              <Spin size="large" />
            </div>
          )}
          <div ref={messageEndRef}></div>
        </div>
        {showScrollIcon && (
          <div style={{ display: "flex", justifyContent: "center", padding: "0.5rem" }}>
            <RiScrollToBottomFill size={30} onClick={scrollToBottom} style={{ cursor: "pointer" }} />
          </div>
        )}
        <div style={{ height: "7%", padding: "1rem", margin: "10px", width: "90%", display: "flex", backgroundColor: "white", borderRadius: "40px", justifyContent: "space-between", alignItems: "center" }}>
          <Input
            type="text"
            style={{ width: "90%" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPressEnter={handleSendMessage}
            variant="borderless"
          />
          <FaArrowCircleRight
            color={text.length === 0 ? "gray" : "black"}
            size={"30px"}
            onClick={handleSendMessage}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}
