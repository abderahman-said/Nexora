import { RefObject } from 'react';

export interface HeroBackgroundProps {
  glowRef: RefObject<HTMLDivElement | null>;
}

export interface HeroContentProps {
  headRef: RefObject<HTMLHeadingElement | null>;
  subRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  badgeRef: RefObject<HTMLDivElement | null>;
  imageRef: RefObject<HTMLDivElement | null>;
}

export interface UseVimeoHeroGSAPProps {
  heroRef: RefObject<HTMLDivElement | null>;
  headRef: RefObject<HTMLHeadingElement | null>;
  subRef: RefObject<HTMLParagraphElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  badgeRef: RefObject<HTMLDivElement | null>;
  glowRef: RefObject<HTMLDivElement | null>;
  imageRef: RefObject<HTMLDivElement | null>;
}
