import { UserIcon } from "lucide-react";
import Logo from "./icon/Logo";
import SettingsIcon from "./icon/SettingsIcon";

function TopBar() {
  return (
    <div className="flex justify-between items-center p-5 bg-sky-200 w-full md:hidden sticky top-0 z-50">
      <Logo className="w-10" />
      <div className="flex gap-x-2 items-center">
        <UserIcon />
        <SettingsIcon />
      </div>
    </div>
  );
}

export default TopBar;
