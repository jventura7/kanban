import { Switch } from "../ui/switch";
import LightIcon from "@/public/assets/icon-light-theme.svg";
import DarkIcon from "@/public/assets/icon-dark-theme.svg";
import { useTheme } from "next-themes";
import { ReactNode, forwardRef, createRef, HTMLAttributes } from "react";

interface ThemeSwitchWrapperProps extends HTMLAttributes<HTMLDivElement> {
  width: string;
  children?: ReactNode;
}

const ThemeSwitchWrapper = forwardRef<HTMLDivElement, ThemeSwitchWrapperProps>(
  ({ width, ...props }, ref) => (
    <div ref={ref} {...props} style={{ width }}>
      {props.children}
    </div>
  ),
);

export default function ThemeSwitch({ customWidth }: { customWidth: string }) {
  const { theme, setTheme } = useTheme();
  const switchWrapperRef = createRef<HTMLDivElement>();

  return (
    <ThemeSwitchWrapper
      ref={switchWrapperRef}
      className="bg-main-background m-auto flex items-center justify-center space-x-4 rounded-lg p-2 py-3"
      width={customWidth} // Pass the custom width as a prop
    >
      <LightIcon />
      <Switch
        checked={theme === "light" ? false : true}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="bg-primary-blue"
      />
      <DarkIcon />
    </ThemeSwitchWrapper>
  );
}
