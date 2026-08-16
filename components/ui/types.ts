import { HTMLAttributes, ElementType, ReactNode, Ref, ComponentPropsWithRef } from 'react';

export type { ElementType, ReactNode, Ref, ComponentPropsWithRef };

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface SkeletonCardProps {
  className?: string;
}

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export type StatusColor = 'info' | 'success' | 'warning' | 'error' | 'blue' | 'cyan' | 'indigo' | 'amber';

export interface StatusStyle {
  dot: string;
  text: string;
  tagBorder: string;
  highlight: string;
}

export interface CornerFrameProps {
  children: ReactNode;
  extraClass?: string;
}

export interface SectionHeaderProps {
  badge?: string;
  tag?: string;
  badgeColor?: StatusColor;
  title?: ReactNode;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'between';
  as?: ElementType;
  size?: 'hero' | 'default';
  titleRef?: Ref<HTMLElement>;
  rightElement?: ReactNode;
  className?: string;
  animClass?: string;
}

// في types.ts بتاع GSAPSlider
export interface GSAPSliderProps<T> {
  items: T[];
  renderItem?: (item: T, index: number, isActive?: boolean) => React.ReactNode;
  autoplay?: boolean;
  autoplayInterval?: number;
  defaultVisibleCount?: number;
  showDots?: boolean;
  pauseOnHover?: boolean;
  enableDrag?: boolean;
  mobileVisibleCount?: number;
  tabletVisibleCount?: number;
  className?: string;
  centerModeMobile?: boolean;
  centerCardWidthPercent?: number;
  infinite?: boolean;
}

export interface NavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  position: "side" | "center";
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  href?: string;
}

export interface FormInputProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  required?: boolean;
  icon?: ElementType | null;
  isTextarea?: boolean;
  rows?: number;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
}

export interface InteractiveCardProps {
  stepNumber?: string | number;
  serial?: string | number;
  badge?: string;
  icon?: ElementType;
  title: string;
  description: string;
  features?: string[];
  buttonText?: string;
  buttonLink?: string;
  className?: string;
  variant?: 'default' | 'ghost';
}

export interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

export interface OptimizedImageProps extends Omit<import('next/image').ImageProps, 'alt'> {
  alt: string;
}



export interface SharedHeroProps {
  id: string;
  titlePrefix: string;
  titleHighlight: string;
  breadcrumbLabel: string;
  backgroundImage?: string;
}

export interface ThemeToggleProps {
  className?: string;
}

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export interface LanguageToggleProps {
  className?: string;
}
