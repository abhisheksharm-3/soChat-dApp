"use client";
import images from "../../../public/assets/assets/index.js";
import { ChatAppContext } from "@/Context/ChatAppContext";
import Model from "../Model/Model";
import { useContext, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContext);
  const [addFriend, setAddFriend] = useState(false);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <div className="flex items-center mb-4 sm:w-1/2">
          <Input
            type="text"
            className="w-full"
            placeholder="Search"
            startContent={
              <Image src={images.search} alt="search" width={20} height={20} />
            }
          />
        </div>

        {/* Buttons: Clear Chat and Add Friend */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 mb-4">
          <Button
            className="flex items-center space-x-2 w-full sm:w-auto mb-2 sm:mb-0"
            onClick={() => console.log("Clear Chat clicked")}
            startContent={
              <Image src={images.clear} alt="clear" width={20} height={20} />
            }
          >
            Clear Chat
          </Button>
          <Button
            className="flex items-center space-x-2 w-full sm:w-auto"
            onClick={() => setAddFriend(true)}
            startContent={
              <Image src={images.user} alt="clear" width={20} height={20} />
            }
          >
            Add Friend
          </Button>
        </div>
      </div>

      {/* Add Friend Modal */}
      {addFriend && (
        <Model
          openBox={setAddFriend}
          title="Welcome to"
          head="SoChat"
          info="Lorem ipsum"
          smallInfo="Kindly select your friend's name and address"
          image={images.hero}
          functionName={addFriends}
        />
      )}
    </div>
  );
};

export default Filter;
