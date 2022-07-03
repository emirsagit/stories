import { useRouter } from "next/router";

const SidebarButtons = ({ Icon, text, active }) => {
  const router = useRouter();
  return (
    <div
      className={`text-[#d9d9d9] flex justify-center lg:justify-start text-xl
      space-x-3 hoverAnimation ${active && "font-bold"}`}
      onClick={() => active && router.push("/")}
    >
      <Icon className="h-7" />
      <span className="inline">{text}</span>
    </div>
  );
};

export default SidebarButtons;
