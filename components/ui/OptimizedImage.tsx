import Image, { ImageProps } from 'next/image';
import React from 'react';

const DEFAULT_BLUR_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGNQTX4NAAIkAXSaGkHUAAAAAElFTkSuQmCC';

export interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  ...props
}) => {
  const defaultBlurDataURL = blurDataURL || DEFAULT_BLUR_DATA_URL;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={sizes}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={defaultBlurDataURL}
      {...props}
    />
  );
};

export default OptimizedImage;
