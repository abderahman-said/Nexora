import { RefObject, ReactNode, ReactElement } from 'react';

export interface UseFooterGSAPProps {
  footerRef: RefObject<HTMLElement>;
  columnsRef: RefObject<HTMLElement>;
  sidePanelRef: RefObject<HTMLElement>;
  bgRef: RefObject<HTMLElement>;
}

export interface InteractiveCircleButtonProps {
    href: string;
    children: ReactNode;
}

export interface FooterSidePanelProps {
    sidePanelRef?: RefObject<HTMLDivElement>;
}

export interface FooterAnimatedShellProps {
  columns: ReactNode;
  sidePanel: ReactElement;
  bottomBar: ReactNode;
}
