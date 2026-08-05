import { RefObject } from 'react';

export interface AboutVisualProps {
  visualRef: RefObject<HTMLDivElement | null>;
}

export interface UseAboutGSAPProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  visualRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}
