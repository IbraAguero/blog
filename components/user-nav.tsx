import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ButtonLogout from "./button-logout";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface navbarInterface {
  user: {
    name?: string | null;
    email: string | null;
    image?: string;
    userId: string;
  };
}

const UserNav = async ({ user }: navbarInterface) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ButtonLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserNav;
