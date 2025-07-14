import { useState, useCallback, useRef, useEffect } from "react";

export const useGetMessages = () => {
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState(new Set());
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const analyzeSentiment = (text) => {
    const lower = text.toLowerCase();
    const pos = ["happy", "love", "great", "amazing"];
    const neg = ["sad", "angry", "bad", "hate"];
    const hasPos = pos.some((w) => lower.includes(w));
    const hasNeg = neg.some((w) => lower.includes(w));
    return hasPos && !hasNeg
      ? "positive"
      : hasNeg && !hasPos
      ? "negative"
      : "neutral";
  };

  const joinChat = useCallback(async (userName) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName }),
    });

    if (!res.ok) {
      console.error("Failed to create user");
      return null;
    }

    const user = await res.json();
    const userId = user._id;

    setConnectedUsers((prev) => new Set([...prev, userId]));

    const systemMessage = {
      id: `sys_${Date.now()}`,
      userId: "system",
      userName: "System",
      text: `${userName} joined the chat`,
      sentiment: "neutral",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, systemMessage]);

    return userId;
  }, []);

  const sendMessage = useCallback(async (userId, userName, text) => {
    const messagePayload = {
      userId,
      userName,
      text: text.trim(),
      sentiment: "pending",
    };

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messagePayload),
    });

    if (!res.ok) {
      console.error("Failed to send message");
      return;
    }

    const savedMessage = await res.json();
    setMessages((prev) => [...prev, savedMessage]);

    s;
    setTimeout(async () => {
      const sentiment = analyzeSentiment(text);

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === savedMessage._id ? { ...msg, sentiment } : msg
        )
      );
      console.log("Sentiment analyzed:", sentiment);

      const patchRes = await fetch(`/api/messages/${savedMessage._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentiment }),
      });

      if (!patchRes.ok) {
        console.error("Failed to update sentiment");
      }
    }, 3000);
  }, []);

  const leaveChat = useCallback((userId, userName) => {
    setConnectedUsers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });

    const systemMessage = {
      id: `sys_${Date.now()}`,
      userId: "system",
      userName: "System",
      text: `${userName} left the chat`,
      sentiment: "neutral",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, systemMessage]);
  }, []);

  return {
    messages,
    connectedUsers: connectedUsers.size,
    sendMessage,
    joinChat,
    leaveChat,
  };
};
