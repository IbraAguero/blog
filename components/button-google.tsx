"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa6";

const ButtonGoogle = () => {
  const handleClick = async () => {
    await signIn("google");
  };
  return (
    <Button onClick={handleClick} className="text-md flex justify-center">
      <FaGoogle className="mr-2 h4 w-4" />
      Iniciar sesión
    </Button>
  );
};
export default ButtonGoogle;
