import { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarAnimatedShellProps {
  children: ReactNode;
}
