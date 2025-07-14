import { useState } from "react";
import ChatRoom from "../components/ChatRoom";
import UserJoinForm from "../components/UserJoinForm";
import { useGetMessages } from "../hooks/useGetMessages";

const Index = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { messages, connectedUsers, sendMessage, joinChat, leaveChat } =
    useGetMessages();

  const handleJoin = async (userName) => {
    const userId = await joinChat(userName);
    setCurrentUser({ id: userId, name: userName });
  };

  const handleLeave = () => {
    if (currentUser) {
      leaveChat(currentUser.id, currentUser.name);
      setCurrentUser(null);
    }
  };

  const handleSendMessage = (text) => {
    if (currentUser) {
      sendMessage(currentUser.id, currentUser.name, text);
    }
  };

  if (!currentUser) {
    return <UserJoinForm onJoin={handleJoin} />;
  }

  return (
    <ChatRoom
      userName={currentUser.name}
      userId={currentUser.id}
      messages={messages}
      connectedUsers={connectedUsers}
      onSendMessage={handleSendMessage}
      onLeave={handleLeave}
    />
  );
};

export default Index;
