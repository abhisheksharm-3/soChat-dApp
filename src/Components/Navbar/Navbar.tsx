"use client";
import { useContext, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { ChatAppContext } from "@/Context/ChatAppContext";
import Model from "../Model/Model";
import ErrorComponent from "../Error/Error";
import images from "../../../public/assets/assets/index.js";
import Image from "next/image";

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const {
    account,
    userName,
    connectWallet,
    checkIfWalletConnected,
    createAccount,
    error,
  } = useContext(ChatAppContext);
  const menuItems = [
    { label: "All Users", href: "/all" },
    { label: "Chat", href: "/chat" },
    { label: "Contact", href: "/contact" },
    { label: "Settings", href: "/settings" },
    { label: "FAQ", href: "/faq" },
    { label: "Terms of Use", href: "/terms" },
  ];
  const handleClick = () => {
    if (account === "") {
      connectWallet(); // Call connectWallet function if account is empty
    } else {
      setOpenModel(true); // Set openModal to true if account is not empty
    }
  };
  const isActive = (href: string) => {
    const pathname = usePathname();
    return pathname === href;
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src={images.logo} alt="logo" width={50} height={100} />
          <p className="font-bold text-inherit">SoChat</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item.label}-${index}`}
            isActive={isActive(item.href)}
          >
            <Link
              color={isActive(item.href) ? "primary" : "foreground"}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="primary" variant="flat" onClick={handleClick}>
            {account != "" ? (
              <div className="flex items-center justify-center gap-2">
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="User image"
                  width={20}
                  height={50}
                />
                <span>{userName || "Create Account"}</span>
              </div>
            ) : (
              "Connect Wallet"
            )}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item.label}-${index}`}
            isActive={isActive(item.href)}
          >
            <Link
              color={isActive(item.href) ? "primary" : "foreground"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      {openModel && (
        <div className="fixed inset-0 z-50 bg-black">
          <Model
            openBox={setOpenModel}
            title="Welcome To"
            head="SoChat"
            info="lorem"
            smallInfo="Kindly Select Your Name"
            image={images.hero}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}
      {error == "" ? "" : <ErrorComponent error={error} />}
    </Navbar>
  );
};

export default NavbarComponent;
