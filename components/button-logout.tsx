"use client";
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const ButtonLogout = () => {
  const handleClick = async () => {
    await signOut();
  };

  return (
    <DropdownMenuItem onClick={handleClick} className="cursor-pointer">
      Cerrar sesion
    </DropdownMenuItem>
  );
};
export default ButtonLogout;
