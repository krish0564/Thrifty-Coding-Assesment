import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

let socket;

export const useSocket = (userId, userName) => {
  const [messages, setMessages] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && userId && userName) {
      socket = io("http://localhost:3000"); // Your Socket.IO server

      socket.on("connect", () => {
        console.log("✅ Connected:", socket.id);
        socket.emit("join", { userId, userName });
      });

      socket.on("receive_message", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("sentiment_updated", ({ messageId, sentiment }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === messageId || msg.id === messageId
              ? { ...msg, sentiment }
              : msg
          )
        );
      });

      initialized.current = true;
    }

    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
        console.log("🛑 Disconnected:", socket.id);
      }
    };
  }, [userId, userName]);

  const sendMessage = (message) => {
    if (socket && socket.connected) {
      socket.emit("send_message", message);
    }
  };

  const updateSentiment = ({ messageId, sentiment }) => {
    console.log("Updating sentiment for message:", messageId, sentiment);
    if (socket && socket.connected) {
      socket.emit("update_sentiment", { messageId, sentiment });
    }
  };

  return { messages, sendMessage, updateSentiment };
};
