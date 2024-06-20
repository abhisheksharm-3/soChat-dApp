import { FC } from "react";
import images from "../../../public/assets/assets/index.js";
import Image, { StaticImageData } from "next/image";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";

interface User {
  name: string;
  accountAddress: string;
}

interface UserCardProps {
  el: User;
  addFriends: (name: string, accountAddress: string) => void;
  i: number;
}

const UserCard: FC<UserCardProps> = ({ el, addFriends, i }) => {
  // Function to format the account address
  const formatAddress = (address: string) => {
    // Display first 8 characters and the last 8 characters
    const trimmedAddress = `${address.substring(0, 8)}...${address.substring(address.length - 8)}`;
    return trimmedAddress;
  };
  const imageKey = `image${i + 1}` as keyof typeof images;
  const selectedImage = images[imageKey] as StaticImageData;

  return (
    <Card className="py-4 border border-gray-200 rounded-lg shadow-md">
      <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start">
        <p className="text-gray-500 text-xs">{formatAddress(el.accountAddress)}</p>
        <h4 className="font-bold text-xl mt-1">{el.name}</h4>
      </CardHeader>
      <CardBody className="rounded-b-lg overflow-hidden flex flex-col gap-2">
        <div className="relative h-40">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={selectedImage}
            layout="fill"
          />
        </div>
        <Button
          className="mt-auto w-full"
          onClick={() => addFriends(el.name, el.accountAddress)}
        >
          Add Friend
        </Button>
      </CardBody>
    </Card>
  );
};

export default UserCard;
