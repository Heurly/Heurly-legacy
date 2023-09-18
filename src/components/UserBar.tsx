import SettingsBtn from "./SettingsBtn";

export default function UserBar() {
  return (
    <div className="border-t border-neutral-600 flex items-center justify-center gap-10 py-5 px-3 w-full">
      <p>A.&nbsp;Hait&nbsp;Amid</p>
      <SettingsBtn />
    </div>
  );
}
