import EventIcon from "./icon/EventIcon";
import LogoutIcon from "./icon/LogoutIcon";
import SettingsIcon from "./icon/SettingsIcon";
import TimeTableIcon from "./icon/TimetableIcon";
import RevisionIcon from "./icon/RevisionIcon";
import Logo from "./icon/Logo";
import UserIcon from "./icon/UserIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

type PropsNavBarItems = {
  name: React.ReactNode;
  icon: React.ReactNode;
  href: string;
};

function NavBarItems({ name, icon, href }: PropsNavBarItems) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href}>{icon}</Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function NavBar() {
  const navbarElement = [
    {
      name: "Emplois du temps",
      icon: <TimeTableIcon />,
      href: "/timetable",
    },
    {
      name: "Révisions",
      icon: <RevisionIcon />,
      href: "/revision",
    },
    {
      name: "Evénements",
      icon: <EventIcon />,
      href: "/event",
    },
    {
      name: "Profil",
      icon: <UserIcon />,
      href: "/profile",
    },
  ];
  return (
    <nav className="flex flex-col justify-between items-center md:h-full md:w-[unset] w-11/12 sticky top-[85%] left-1/2 md:left-[unset] -translate-x-7 md:translate-x-0 md:relative md:top-[unset] px-5 py-10 bg-sky-200 rounded-full">
      <Link href="/" data-cy="logo" className="hidden md:block">
        <Logo className="w-20" />
      </Link>
      <div className="flex md:flex-col gap-10 justify-between w-full md:w-[unset] px-5">
        {navbarElement.map(({ href, name, icon }, index) => (
          <NavBarItems key={index} name={name} icon={icon} href={href} />
        ))}
      </div>
      <div className="md:flex flex-col gap-5 justify-between hidden">
        <NavBarItems href="/logout" name="Déconnexion" icon={<LogoutIcon />} />
        <NavBarItems
          href="/settings"
          name="Paramètres"
          icon={<SettingsIcon />}
        />
      </div>
    </nav>
  );
}
