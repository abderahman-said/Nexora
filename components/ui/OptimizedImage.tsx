import Image from 'next/image';
import React from 'react';
import type { OptimizedImageProps } from './types';

const DEFAULT_BLUR_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  loading,
  decoding = 'async',
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
      loading={priority ? undefined : (loading || 'lazy')}
      decoding={decoding}
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
