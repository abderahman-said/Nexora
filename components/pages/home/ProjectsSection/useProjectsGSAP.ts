import { RefObject } from 'react';

/**
 * Projects section animation — GSAP removed.
 * Kept as a no-op hook so call sites don't need to change.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useProjectsGSAP(_sectionRef: RefObject<HTMLElement | null>, _sliderWrapperRef: RefObject<HTMLElement | null>) {
  // No-op: animations disabled pending GSAP removal
}
