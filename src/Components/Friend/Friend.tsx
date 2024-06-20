"use client";

import { ChatAppContext } from "@/Context/ChatAppContext";
import { useContext } from "react";
import Card from "../Card/Card";
import Chat from "../Chat/Chat";

const Friend = () => {
  const {
    sendMessage,
    account,
    friendLists,
    readMessage,
    userName,
    loading,
    currentUserAddress,
    currentUserName,
    friendMsg,
    readUser,
  } = useContext(ChatAppContext);

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 p-4 overflow-y-auto border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Friends List</h2>
        {friendLists.map((el, i) => (
          <Card
            key={i + 1}
            el={el}
            i={i}
            readMessage={readMessage}
            readUser={readUser}
          />
        ))}
      </div>
      <div className="md:w-1/2 p-4">
        <Chat
          functionName={sendMessage}
          readMessage={readMessage}
          friendMsg={friendMsg}
          account={account}
          userName={userName}
          loading={loading}
          currentUserName={currentUserName}
          currentUserAddress={currentUserAddress}
        />
      </div>
    </div>
  );
};

export default Friend;

