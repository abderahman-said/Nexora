import { RefObject, ReactNode } from "react";

export interface NavLogoProps {
  logoRef?: RefObject<HTMLDivElement | null>;
}

export interface NavLinksProps {
  linksRef?: RefObject<HTMLUListElement | null>;
}

export interface NavCTAProps {
  ctaRef?: RefObject<HTMLDivElement | null>;
}

export interface UseNavbarGSAPProps {
  navRef: RefObject<HTMLElement | null>;
  navInnerRef: RefObject<HTMLElement | null>;
  logoRef?: RefObject<HTMLElement | null>;
  linksRef?: RefObject<HTMLElement | null>;
  ctaRef?: RefObject<HTMLElement | null>;
}

export interface NavLink {
    label: string;
    href: string;
}

export interface NavbarAnimatedShellProps {
  children: ReactNode;
}
