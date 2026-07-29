import { RefObject, ReactNode, ReactElement } from 'react';

export interface UseFooterGSAPProps {
  footerRef: RefObject<HTMLElement | null>;
  columnsRef: RefObject<HTMLElement | null>;
  sidePanelRef: RefObject<HTMLElement | null>;
  bgRef: RefObject<HTMLElement | null>;
}

export interface InteractiveCircleButtonProps {
    href: string;
    children: ReactNode;
}

export interface FooterSidePanelProps {
    sidePanelRef?: RefObject<HTMLDivElement | null>;
}

export interface FooterAnimatedShellProps {
  columns: ReactNode;
  sidePanel: ReactElement;
  bottomBar: ReactNode;
}
