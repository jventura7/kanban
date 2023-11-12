import HideIcon from "@/public/assets/icon-hide-sidebar.svg";
import { renderAllBoards } from "@/util/helper";
import ThemeSwitch from "./ThemeSwitch";
import { Button } from "../ui/button";
import { useStore } from "@/util/store";

export default function SideBar() {
  const { boards, user } = useStore();

  return (
    <div className="hidden bg-nav-background md:flex md:flex-col md:justify-between">
      <div>
        <div className="p-4 pt-6 font-bold tracking-widest text-primary-medium-grey">
          <h1>ALL BOARDS ({boards?.boards?.length})</h1>
        </div>
        {renderAllBoards(false, "-sidebar")}
      </div>
      <div>
        <div className="p-6">
          <ThemeSwitch customWidth="100%" />
        </div>
        <div className="w-full pr-8">
          <Button className="hover:bg-item-hover mb-6 flex w-full items-center justify-start rounded-r-full bg-nav-background py-7 pl-6 font-bold text-primary-medium-grey hover:text-primary-blue hover:opacity-100">
            <HideIcon />
            <span className="ml-2 text-lg">Hide Sidebar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
