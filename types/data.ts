export interface BrandLogo {
  name: string;
  src: string;
}

export interface SocialIconLink {
  href: string;
  label: string;
  icon: string;
}

export interface ServiceCardData {
  color: string;
  sticker: string;
  title: string;
  services: string[];
}

export interface AnimationConfig {
  transitionScribble: {
    strokeWidthStart: string;
    strokeWidthMax: string;
    scale: number;
    durationIn: number;
    durationOut: number;
  };
}
