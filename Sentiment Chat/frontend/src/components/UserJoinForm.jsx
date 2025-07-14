import { useState } from "react";
import { MessageCircle, Users, Brain } from "lucide-react";

export default function UserJoinForm({ onJoin }) {
  const [userName, setUserName] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async () => {
    if (userName.trim()) {
      setIsJoining(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      onJoin(userName.trim());
      setIsJoining(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isJoining) {
      handleJoin();
    }
  };

  return (
    <div className="min-h-screen h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-0 m-0">
      <div className="w-full h-full bg-white rounded-none shadow-none p-0 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-4">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Real-Time Chat</h2>
            <p className="text-sm text-gray-600">
              Join the global conversation with AI-powered sentiment analysis
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Live messaging</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Smart sentiment</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name
              </label>
              <input
                id="username"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter your name to join..."
                disabled={isJoining}
                maxLength={50}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-black focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
              />
            </div>

            <button
              onClick={handleJoin}
              disabled={!userName.trim() || isJoining}
              className={`w-full py-2 px-4 rounded-md text-lg flex items-center justify-center transition-colors
              ${
                isJoining || !userName.trim()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              }
            `}
            >
              {isJoining ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin border-2 border-blue-600 border-t-transparent rounded-full" />
                  Joining...
                </>
              ) : (
                "Join Chat"
              )}
            </button>
          </div>

          <div className="text-xs text-gray-500 text-center mt-6 bg-gray-100 rounded-lg p-3">
            <div className="font-medium mb-1">
              How sentiment analysis works:
            </div>
            <div>
              Messages are analyzed for emotional tone and displayed with
              color-coded badges.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
