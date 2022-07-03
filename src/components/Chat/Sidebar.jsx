import Image from "next/image";
import SidebarButtons from "./SidebarButtons";
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/outline";
import Logout from "./Logout";

const Sidebar = () => {
  return (
    <div
      className="hidden lg:flex flex-col items-center xl:items-start
    lg:w-[340px] p-2 fixed h-full mt-0 lg:mt-4"
    >
      <div className="space-y-2 mt-2 mb-2.5 lg:ml-24">
        <SidebarButtons text="ABC Girdiler" Icon={InboxIcon} acive />
        <SidebarButtons text="Anasayfa" Icon={HomeIcon} />
        <SidebarButtons text="Profil" Icon={UserIcon} />
      </div>
    </div>
  );
};

export default Sidebar;
