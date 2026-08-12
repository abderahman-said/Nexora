import { RefObject, ReactNode } from "react";

export interface UseNavbarScrollProps {
  navRef: RefObject<HTMLElement | null>;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarAnimatedShellProps {
  children: ReactNode;
}
