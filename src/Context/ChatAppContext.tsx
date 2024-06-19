"use client";
import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  FC,
} from "react";
import { useRouter } from "next/navigation";
import {
  CheckIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "@/app/api/apiFeatures";
import { Contract } from "ethers"; // Import Contract type from ethers

// Define the context type
interface ChatAppContextType {
  connectWallet: () => Promise<string | undefined>;
  checkIfWalletConnected: () => Promise<boolean>;
  readMessage: (friendAddress: string) => Promise<void>;
  createAccount: (data: {
    name: string;
    accountAddress: string;
  }) => Promise<void>;
  addFriends: (name: string, accountAddress: string) => Promise<void>;
  sendMessage: (data: { msg: string; address: string }) => Promise<void>;
  readUser: (userAddress: string) => Promise<void>;
  account: string;
  userName: string;
  friendLists: string[];
  friendMsg: string[];
  userList: string[];
  loading: boolean;
  error: string;
  currentUserName: string;
  currentUserAddress: string;
}

const defaultContextValue: ChatAppContextType = {
  connectWallet: async () => undefined,
  checkIfWalletConnected: async () => false,
  readMessage: async () => {},
  createAccount: async () => {},
  addFriends: async () => {},
  sendMessage: async () => {},
  readUser: async () => {},
  account: "",
  userName: "",
  friendLists: [],
  friendMsg: [],
  userList: [],
  loading: false,
  error: "",
  currentUserName: "",
  currentUserAddress: "",
};

export const ChatAppContext = createContext<ChatAppContextType>(
  defaultContextValue
);

interface ChatAppProviderProps {
  children: ReactNode;
}

export const ChatAppProvider: FC<ChatAppProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [friendLists, setFriendLists] = useState<string[]>([]);
  const [friendMsg, setFriendMsg] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [currentUserAddress, setCurrentUserAddress] = useState<string>("");

  const router = useRouter();

  const fetchData = async () => {
    try {
      const walletConnected = await checkIfWalletConnected();
      if (!walletConnected) {
        setError("Please Connect your Wallet");
        return;
      }

      const contract = await connectingWithContract();
      const currentAccount = await connectWallet();
      setAccount(currentAccount || "");
      const username = await contract?.getUsername(currentAccount);
      setUserName(username || "");
      const friendList = await contract?.getMyFriendList();
      setFriendLists(friendList || []);
      const userList = await contract?.getAllAppUser();
      setUserList(userList || []);
    } catch (error) {
      setError("Error while fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkIfWalletConnected = async () => {
    try {
      const connected = await CheckIfWalletConnected();
      return connected;
    } catch (error) {
      console.error("Error checking if wallet is connected:", error);
      return false;
    }
  };

  const readMessage = async (friendAddress: string) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract?.readMessage(friendAddress);
      setFriendMsg(read || []);
    } catch (error) {
      setError("No Messages");
    }
  };

  const createAccount = async ({
    name,
    accountAddress,
  }: {
    name: string;
    accountAddress: string;
  }) => {
    try {
      if (!name || !accountAddress)
        throw new Error("Either name or address not provided");
      const contract = await connectingWithContract();
      const getCreatedUser = await contract?.createAccount(name);
      setLoading(true);
      await getCreatedUser?.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while creating account");
    }
  };

  const addFriends = async (name: string, accountAddress: string) => {
    try {
      if (!name || !accountAddress)
        throw new Error("Either name or account address not received");
      const contract = await connectingWithContract();
      const addMyFriend = await contract?.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend?.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Something went wrong while adding friend");
    }
  };

  const sendMessage = async ({
    msg,
    address,
  }: {
    msg: string;
    address: string;
  }) => {
    try {
      if (!msg || !address) throw new Error("Please type something");
      const contract = await connectingWithContract();
      const addMessage = await contract?.sendMessage(address, msg);
      setLoading(true);
      await addMessage?.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while sending message");
    }
  };

  const readUser = async (userAddress: string) => {
    try {
      const contract = await connectingWithContract();
      const userName = await contract?.getUsername(userAddress);
      setCurrentUserName(userName || "");
      setCurrentUserAddress(userAddress);
    } catch (error) {
      setError("Error while reading user details");
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        connectWallet,
        checkIfWalletConnected,
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        account,
        userName,
        friendLists,
        friendMsg,
        userList,
        loading,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};

export default ChatAppProvider;
