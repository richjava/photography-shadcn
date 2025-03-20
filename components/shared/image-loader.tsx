"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export function ImageLoader({ src, alt, className, aspectRatio = "aspect-[4/5]" }: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("overflow-hidden rounded-2xl relative", aspectRatio)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}