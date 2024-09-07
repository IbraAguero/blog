import Link from "next/link";
import UserNav from "./user-nav";
import { auth } from "@/auth";
import ButtonGoogle from "./button-google";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="border-b p-3 flex justify-between">
      <h1 className="text-2xl font-bold">
        <Link href="/">Blog</Link>
      </h1>
      {session?.user ? <UserNav user={session?.user} /> : <ButtonGoogle />}
    </nav>
  );
};
export default Navbar;
