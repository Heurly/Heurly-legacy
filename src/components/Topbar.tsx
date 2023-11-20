import Logo from "./icon/Logo";
import SettingsIcon from "./icon/SettingsIcon";

function TopBar() {
  return (
    <div className="flex justify-between items-center p-5 bg-sky-200 w-full md:hidden sticky top-0">
      <Logo className="w-10" />
      <SettingsIcon />
    </div>
  );
}

export default TopBar;
