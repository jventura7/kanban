import HideIcon from "@/public/assets/icon-hide-sidebar.svg";
import { renderAllBoards } from "@/util/helper";
import ThemeSwitch from "./ThemeSwitch";
import { Button } from "../ui/button";
import { useStore } from "@/util/store";

export default function SideBar() {
  const { boards } = useStore();

  return (
    <div className="bg-nav-background hidden md:flex md:flex-col md:justify-between">
      <div>
        <h1 className="p-4 pt-10 font-bold tracking-widest text-primary-medium-grey">
          {" "}
          ALL BOARDS ({boards?.boards.length})
        </h1>
        {renderAllBoards(false, "-sidebar")}
      </div>
      <div>
        <div className="p-6">
          <ThemeSwitch customWidth="100%" />
        </div>
        <div className="w-full pr-8">
          <Button className="bg-nav-background hover:bg-item-hover mb-6 flex w-full items-center justify-start rounded-r-full py-7 pl-6 font-bold text-primary-medium-grey hover:text-primary-blue hover:opacity-100">
            <HideIcon />
            <span className="ml-2 text-lg">Hide Sidebar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
