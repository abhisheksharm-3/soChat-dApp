"use client";
import UserCard from "@/Components/UserCard/UserCard";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { useContext } from "react";

const AllUsers = () => {
  const { userList, addFriends } = useContext(ChatAppContext);
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-300">Find Your Friends</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userList.map((el, i) => (
          <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
