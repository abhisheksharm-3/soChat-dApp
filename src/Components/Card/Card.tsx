import Image from "next/image";
import Link from "next/link";
import images from "../../../public/assets/assets/index.js";
import React from "react";

export interface FriendList {
  name: string;
  pubkey: string;
  // Define other properties of FriendList as needed
}

interface CardProps {
  el: FriendList;
  i: number;
  readMessage: (address: string) => void;
  readUser: (address: string) => void;
}

const Card: React.FC<CardProps> = ({ el, i, readMessage, readUser }) => {
  const handleReadMessage = () => {
    readMessage(el.pubkey);
  };

  const handleReadUser = () => {
    readUser(el.pubkey);
  };

  // Function to truncate the pubkey
  const truncatePubkey = (pubkey: string, length: number) => {
    const visiblePart = pubkey.slice(0, length);
    const hiddenPart = pubkey.slice(length);
    return (
      <span>
        {visiblePart}
        <span className="text-gray-500">..{hiddenPart.slice(-4)}</span>
      </span>
    );
  };

  return (
    <div className="min-w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
      <Link
        href={{
          pathname: "/chat",
          query: { name: `${el.name}`, address: `${el.pubkey}` },
        }}
      >
        <div
          onClick={() => {
            readMessage(el.pubkey);
            readUser(el.pubkey);
          }}
          className="bg-gray-800 shadow-md rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-center">
            <div className="mr-4">
              <Image
                alt="username"
                src={images.accountName}
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold">{el.name}</h4>
              <p className="text-gray-600">{truncatePubkey(el.pubkey, 11)}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
