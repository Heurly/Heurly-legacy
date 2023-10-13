import SettingsBtn from "./SettingsBtn";

export default function UserBar() {
  return (
    <div className="border-t border-neutral-600 bg-neutral-950 flex items-center gap-x-3 py-1 px-7 w-full text-white ">
      <SettingsBtn />  
      <p>A.&nbsp;Hait&nbsp;Amid</p>
    </div>
  );
}
