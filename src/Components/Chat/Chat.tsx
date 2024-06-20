"use client";
import { useSearchParams } from "next/navigation";
import images from "../../../public/assets/assets/index.js";
import { convertTime } from "@/app/api/apiFeatures";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Message } from "@/Context/ChatAppContext.jsx";
import { Input } from "@nextui-org/react";

interface ChatProps {
  functionName: (data: { msg: string; address: string }) => void;
  readMessage: (id: string) => void;
  friendMsg: Message[];
  account: string;
  userName: string;
  loading: boolean;
  currentUserName: string;
  currentUserAddress: string;
}

const Chat: React.FC<ChatProps> = ({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
}) => {
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({ name: "", address: "" });
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;
    setChatData({
      name: searchParams.get("name") || "",
      address: searchParams.get("address") || "",
    });
  }, [searchParams]);

  return (
    <div className="max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg">
      {currentUserAddress && currentUserName ? (
        <div className="p-4 flex items-center">
          <Image src={images.accountName} alt="Image" height={70} width={70} className="rounded-full" />
          <div className="ml-4">
            <h4 className="font-semibold">{currentUserName}</h4>
            <p className="text-gray-600">{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="px-4 py-6">
        <div>
          {friendMsg.map((el, i) => (
            <div key={i} className="flex items-start mb-4">
              <Image src={images.accountName} alt="Image" height={50} width={50} className="rounded-full" />
              <div className="ml-3">
                <div className="flex items-center">
                  <h4 className="font-semibold">
                    {el.sender === chatData.address ? chatData.name : userName}
                  </h4>
                  <span className="text-xs text-gray-500 ml-2">
                    Time: {convertTime(el.timestamp)}
                  </span>
                </div>
                <p className="text-sm mt-1">{el.msg}</p>
              </div>
            </div>
          ))}
        </div>

        {currentUserAddress && currentUserName ? (
          <div className="mt-6">
            <div className="flex items-center rounded-full p-2">
              <Image src={images.smile} alt="smile" width={30} height={30} />
              <Input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type something..."
                className="bg-transparent ml-2 focus:outline-none flex-1"
              />
              <div className="flex gap-1 items-center">
                <Image src={images.file} alt="file" width={30} height={30} />
                <Image
                  src={images.send}
                  alt="send"
                  width={30}
                  height={30}
                  onClick={() =>
                    functionName({
                      msg: message,
                      address: chatData.address,
                    })
                  }
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;

