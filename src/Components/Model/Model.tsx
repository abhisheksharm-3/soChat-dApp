"use client";
import { FC, useContext, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import images from "../../../public/assets/assets/index.js";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Button, Input } from "@nextui-org/react";

interface ModelProps {
  openBox: (open: boolean) => void;
  title: string;
  head: string;
  info: string;
  smallInfo: string;
  image: StaticImageData;
  address: string;
  functionName: (data: {
    name: string;
    accountAddress: string;
  }) => Promise<void>;
}

const Model: FC<ModelProps> = ({
  openBox,
  title,
  head,
  info,
  smallInfo,
  image,
  address,
  functionName,
}) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState(address);

  const { loading } = useContext(ChatAppContext);

  return (
    <div className="container mx-auto p-4">
      <div className="md:flex md:items-center md:justify-center h-screen">
        {/* Left Side: Image */}
        <div className="md:flex md:items-center md:mr-8 mb-4">
          <Image
            src={image}
            alt="model image"
            width={700}
            height={700}
            priority
            className="md:rounded-lg"
          />
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 md:flex md:flex-col md:items-center md:justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {title} <span className="text-blue-500">{head}</span>
            </h1>
            <p className="text-lg mb-2">{info}</p>
            <p className="text-base text-gray-500 mb-4">{smallInfo}</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:mb-4">
            <div className="flex items-center mb-4 md:mb-0 md:mr-4">
              <Input
                className="w-full md:w-64"
                type="text"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                startContent={
                  <Image
                    src={images.username}
                    alt="username"
                    width={30}
                    height={30}
                    className="mr-2"
                  />
                }
              />
            </div>
            <div className="flex items-center mb-4 md:mb-0 md:mr-4">
              <Input
                className="w-full md:w-64"
                type="text"
                value={accountAddress}
                onChange={(e) => setAccountAddress(e.target.value)}
                startContent={
                  <Image
                    src={images.account}
                    alt="address"
                    width={30}
                    height={30}
                    className="mr-2"
                  />
                }
              />
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <Button
              className="w-full md:w-32 mr-4"
              onClick={() => functionName({ name, accountAddress })}
              isLoading={loading}
            >
              <Image src={images.send} alt="send" width={30} height={30} />
              Submit
            </Button>
            <Button className="w-full md:w-32" onClick={() => openBox(false)}>
              <Image src={images.clear} alt="cancel" width={30} height={30} />
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
