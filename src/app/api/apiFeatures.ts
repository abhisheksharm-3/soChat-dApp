import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { ChatAppAddress, ChatAppABI } from "@/Context/constants";

export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (e) {
    console.log(e);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (e) {
    console.log(e);
  }
};

const fetchContract = (signerOrProvider: ethers.Signer | ethers.Provider) =>
  new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const convertTime = (time: bigint | number | string): string => {
  const newTime = new Date(Number(time));

  const hours = newTime.getHours();
  const minutes = newTime.getMinutes();
  const seconds = newTime.getSeconds();
  const date = newTime.getDate();
  const month = newTime.getMonth() + 1;
  const year = newTime.getFullYear();

  const realTime = `${hours}/${minutes}/${seconds} Date: ${date}/${month}/${year}`;
  return realTime;
};

